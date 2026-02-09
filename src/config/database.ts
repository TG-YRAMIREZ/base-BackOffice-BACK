import { PrismaClient } from '@prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno explícitamente
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Ahora process.env.DATABASE_URL ya tendrá valor
const connectionString = (process.env.DATABASE_URL || '').replace(/["']/g, '').trim();

if (!connectionString) {
  throw new Error("❌ DATABASE_URL no definida en process.env");
}

const adapter = new PrismaMssql(connectionString);

export const prisma = new PrismaClient({ 
  adapter,
  log: ['error', 'warn'] 
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


