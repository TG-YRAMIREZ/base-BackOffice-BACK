import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty', 
      options: { colorize: true }
    }
  }
});

const start = async () => {
  try {
    // 1. Configurar Swagger antes que las rutas
    await app.register(swagger, {
      openapi: {
        info: { title: 'Provident Backoffice API', version: '1.0.0' },
        servers: [{ url: 'http://localhost:3000' }]
      }
    });

    await app.register(swaggerUi, {
      routePrefix: '/docs',
      staticCSP: true,
    });

    // 2. Registrar Rutas
    await app.register(authRoutes, { prefix: '/api/v1/auth' });
    await app.register(userRoutes, { prefix: '/api/v1/users' });

    // 3. Health Check rápido
    app.get('/health', async () => ({ status: 'UP', timestamp: new Date() }));

    // 4. Iniciar servidor
    const port = 3000;
    await app.listen({ port, host: '0.0.0.0' });
    
    console.log(`🚀 Servidor listo en: http://localhost:${port}`);
    console.log(`📄 Documentación Swagger: http://localhost:${port}/docs`);
    
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();