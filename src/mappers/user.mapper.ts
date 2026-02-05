// src/mappers/user.mapper.ts
import { UserResponseDto } from '../dtos/users/user.dto'; // Asegúrate que la ruta sea correcta
import { User, ModulePermission } from '@prisma/client';

// Definimos un tipo que incluya la relación de Prisma para evitar el error 'any'
type UserWithPermissions = User & { permissions: ModulePermission[] };

export const toUserResponseDto = (userEntity: UserWithPermissions): UserResponseDto => ({
  id: userEntity.id,
  email: userEntity.email,
  adfsId: userEntity.adfsId, // Prisma ya mapea @map("adfs_id") a camelCase en el cliente
  status: userEntity.status as 'ACTIVE' | 'INACTIVE' | 'SUSPENDED',
  permissions: userEntity.permissions.map((p: ModulePermission) => ({
    moduleCode: p.moduleCode as any,
    canDownloadPii: p.canDownloadPii
  })),
  audit: {
    createdAt: userEntity.createdAt.toISOString(),
    updatedAt: userEntity.updatedAt.toISOString()
  }
});