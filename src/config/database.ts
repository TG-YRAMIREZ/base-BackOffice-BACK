import { PrismaClient } from '@prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';

// Cargamos la URL directamente del proceso (Node 22)
const connectionString = process.env.DATABASE_URL?.replace(/["']/g, '')!;
const adapter = new PrismaMssql(connectionString);

// Instancia única para evitar fugas de memoria en SQL Server
export const prisma = new PrismaClient({ 
  adapter,
  log: ['query', 'error', 'warn'] 
});

/**
 * Función de prueba para validar que los datos del SEED existen
 */
export async function validateSeedData() {
  try {
    const userCount = await prisma.user.count();
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@provident.com.mx' },
      include: { permissions: true }
    });
    
    console.log(`📊 Usuarios en BD: ${userCount}`);
    console.log(`🔑 Admin encontrado: ${admin ? 'SÍ' : 'NO'}`);
    console.log(`📜 Permisos cargados: ${admin?.permissions.length || 0}`);
  } catch (error) {
    console.error('❌ Error al validar datos:', error);
  }
}