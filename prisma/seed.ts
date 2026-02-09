import { PrismaClient } from '@prisma/client';

// En Prisma 6 para scripts de CLI, inicializamos simple
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando Seed de Gobernanza (HU BO-4)...');

  // 1. Crear o actualizar el usuario administrador
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@provident.com.mx' },
    update: { status: 'ACTIVE' },
    create: {
      email: 'admin@provident.com.mx',
      adfsId: 'LOCAL_ADMIN_001',
      status: 'ACTIVE',
    },
  });

  console.log(`✅ Usuario Admin verificado: ${adminUser.email}`);

  // 2. Limpieza de permisos previos para evitar duplicados (Opcional en dev)
  await prisma.modulePermission.deleteMany({ where: { userId: adminUser.userId } });

  // 3. Definición de permisos según HU BO-4
  const permissions = [
    { moduleCode: 'USER_ADMIN', canDownloadPii: true },
    { moduleCode: 'EXP_CLIENTE', canDownloadPii: true },
    { moduleCode: 'CAMPAIGNS_CONFIG', canDownloadPii: false },
    { moduleCode: 'BANNERS_CONFIG', canDownloadPii: false },
    { moduleCode: 'PUSH_NOTIFICATIONS', canDownloadPii: false },
    { moduleCode: 'SAT_SURVEYS', canDownloadPii: false },
    { moduleCode: 'FAQS_CONFIG', canDownloadPii: false },
    { moduleCode: 'TERRITORY_MGMT', canDownloadPii: false },
    { moduleCode: 'DOC_ACCESS_CIS', canDownloadPii: true },
    { moduleCode: 'DOC_ACCESS_INE', canDownloadPii: true },
    { moduleCode: 'DOC_ACCESS_COMPROBANTE', canDownloadPii: true },
    { moduleCode: 'DOC_ACCESS_FACHADA', canDownloadPii: true },
    { moduleCode: 'DOC_ACCESS_CONTRATO', canDownloadPii: true },
    { moduleCode: 'DOC_ACCESS_PAGARE', canDownloadPii: true },
    { moduleCode: 'DOC_ACCESS_PRUEBA_VIDA', canDownloadPii: true },
  ];

  console.log(`🔑 Asignando ${permissions.length} permisos granulares...`);

  // 4. Inserción masiva vinculada al ID correcto
  await prisma.modulePermission.createMany({
    data: permissions.map(p => ({
      userId: adminUser.userId, // Usamos .id que es el nombre en el schema
      moduleCode: p.moduleCode,
      canDownloadPii: p.canDownloadPii
    }))
  });

  console.log(' Seed finalizado con éxito.');
}

main()
  .catch((e) => {
    console.error(' Error en el Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });