import { PrismaClient } from '@prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';

// Inicializamos el adaptador con la cadena de conexión de tu .env
const adapter = new PrismaMssql(process.env.DATABASE_URL!);

// En Prisma 7, pasamos el adaptador directamente al constructor
const prisma = new PrismaClient({ adapter });


async function main() {
  console.log('🌱 Iniciando Seed de Gobernanza (HU BO-4)...');

  // 1. Crear el usuario administrador base (Debe coincidir con el email de Cognito)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@provident.com.mx' },
    update: {},
    create: {
      email: 'admin@provident.com.mx',
      adfsId: 'LOCAL_ADMIN_001',
      status: 'ACTIVE',
    },
  });

  console.log(`✅ Usuario Admin verificado: ${adminUser.email}`);

  // 2. Definición de permisos según HU BO-4 y Criterios de Arquitectura
  const permissions = [
    // Módulos Core
    { moduleCode: 'USER_ADMIN', canDownloadPii: true },
    { moduleCode: 'EXP_CLIENTE', canDownloadPii: true },
    { moduleCode: 'CAMPAIGNS_CONFIG', canDownloadPii: false },
    { moduleCode: 'BANNERS_CONFIG', canDownloadPii: false },
    { moduleCode: 'PUSH_NOTIFICATIONS', canDownloadPii: false },
    { moduleCode: 'SAT_SURVEYS', canDownloadPii: false },
    { moduleCode: 'FAQS_CONFIG', canDownloadPii: false },
    { moduleCode: 'TERRITORY_MGMT', canDownloadPii: false },
    // Acceso Granular a Documentos (Requerimiento Crítico)
    { moduleCode: 'DOC_ACCESS_CIS', canDownloadPii: true },
    { moduleCode: 'DOC_ACCESS_INE', canDownloadPii: true },
    { moduleCode: 'DOC_ACCESS_COMPROBANTE', canDownloadPii: true },
    { moduleCode: 'DOC_ACCESS_FACHADA', canDownloadPii: true },
    { moduleCode: 'DOC_ACCESS_CONTRATO', canDownloadPii: true },
    { moduleCode: 'DOC_ACCESS_PAGARE', canDownloadPii: true },
    { moduleCode: 'DOC_ACCESS_PRUEBA_VIDA', canDownloadPii: true },
  ];

  console.log('🔑 Asignando permisos granulares...');

  for (const perm of permissions) {
    await prisma.modulePermission.upsert({
      where: {
        // Como no tenemos un índice único compuesto, buscamos por combinación en lógica
        permId: '00000000-0000-0000-0000-000000000000', // Valor dummy para forzar el create si no existe lógica compleja
      },
      update: {},
      create: {
        userId: adminUser.id,
        moduleCode: perm.moduleCode,
        canDownloadPii: perm.canDownloadPii,
      },
    });
  }

  console.log('🚀 Seed finalizado con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });