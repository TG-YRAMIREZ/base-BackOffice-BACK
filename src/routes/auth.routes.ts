import { FastifyInstance } from 'fastify';
import { loginHandler } from '../controllers/auth/auth.controller';
import { loginSchema } from '../schemas/auth.schema';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', {
    schema: {
      ...loginSchema,
      description: 'Login de usuario vinculado con Cognito/ADFS',
      tags: ['Authentication']
    }
  }, loginHandler);
}