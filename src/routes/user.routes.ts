import { FastifyInstance } from 'fastify';
import { getUsersHandler, createUserHandler } from '../controllers/user.controller';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/', {
    schema: {
      description: 'Listar todos los usuarios administrativos',
      tags: ['User Management']
    }
  }, getUsersHandler);

  fastify.post('/', {
    schema: {
      description: 'Crear un nuevo usuario con permisos granulares',
      tags: ['User Management'],
      body: {
        type: 'object',
        required: ['email', 'modules', 'canDownloadPii'],
        properties: {
          email: { type: 'string', format: 'email' },
          modules: { type: 'array', items: { type: 'string' } },
          documentPermissions: { type: 'array', items: { type: 'string' } },
          canDownloadPii: { type: 'boolean' }
        }
      }
    }
  }, createUserHandler);
}