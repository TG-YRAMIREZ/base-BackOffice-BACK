import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const app = Fastify({ logger: true });

// Registro de Swagger
app.register(swagger, {
  openapi: {
    info: { title: 'Backoffice API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000' }]
  }
});

app.register(swaggerUi, { routePrefix: '/docs' });

// Al arrancar, podrás ver la documentación en http://localhost:3000/docs