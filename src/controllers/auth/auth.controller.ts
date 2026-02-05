import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from '../../services/auth/auth.service'

export const loginHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, sub, fullName } = request.body as any;

  const authData = await AuthService.executeLogin(email, sub, fullName);

  if (!authData) {
    // Error estándar según requerimiento BO-3
    return reply.status(403).send({ 
      message: 'No tiene permisos para acceder al portal' 
    });
  }

  return reply.send(authData);
};