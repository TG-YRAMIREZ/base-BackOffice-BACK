import { prisma } from '../../src/config/database';
import { CreateUserDto } from '../../src/dtos/users/user.dto';

export class UserService {
  // Listar todos los usuarios con sus permisos agrupados
  static async getAllUsers() {
    return await prisma.user.findMany({
      where: { deletedAt: null },
      include: { permissions: true }
    });
  }

  // Crear usuario con lógica de BO-4
  static async createUser(data: CreateUserDto) {
    // 1. Validar dominio institucional
    if (!data.email.endsWith('@provident.com.mx')) {
      throw new Error('Solo se permiten correos @provident.com.mx');
    }

    // 2. Mapear permisos de módulos y documentos
    const allModuleCodes = [
      ...data.modules,
      ...(data.documentPermissions || [])
    ];

    // 3. Crear usuario y permisos en una transacción
    return await prisma.user.create({
      data: {
        email: data.email,
        status: 'ACTIVE',
        permissions: {
          create: allModuleCodes.map(code => ({
            moduleCode: code,
            canDownloadPii: data.canDownloadPii
          }))
        }
      },
      include: { permissions: true }
    });
  }
}