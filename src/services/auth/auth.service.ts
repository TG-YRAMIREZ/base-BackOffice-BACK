import { prisma } from '../../config/database';
import { LoginResponseDto } from '../../dtos/auth.dto';

export class AuthService {
  static async executeLogin(email: string, sub: string, fullName: string): Promise<LoginResponseDto | null> {
    // 1. Búsqueda inicial con relación de permisos
    const user = await prisma.user.findUnique({
      where: { email },
      include: { permissions: true }
    });

    if (!user || user.status !== 'ACTIVE') {
      return null;
    }

    // 2. Actualización usando userId (que ya existe en tu esquema)
    const updatedUser = await prisma.user.update({
      where: { userId: user.userId },
      data: { 
        lastLogin: new Date(),
        adfsId: sub 
      },
      include: { permissions: true } // Incluimos permisos en el resultado
    });

    // 3. Mapeo de permisos para el DTO plano
    const permissionsList = updatedUser.permissions.map(p => p.moduleCode);

    return {
      user: {
        userId: updatedUser.userId,
        email: updatedUser.email,
        fullName: fullName,
        lastLogin: updatedUser.lastLogin
      },
      permissions: permissionsList,
      accessToken: "COGNITO_TOKEN_PLACEHOLDER"
    };
  }
}