import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from '../../src/services/user.service';
import { CreateUserDto } from '../../src/dtos/users/user.dto';

export const getUsersHandler = async (_request: FastifyRequest, reply: FastifyReply) => {
  const users = await UserService.getAllUsers();
  return reply.send(users);
};

export const createUserHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = request.body as CreateUserDto;
    const newUser = await UserService.createUser(data);
    return reply.status(201).send(newUser);
  } catch (error: any) {
    return reply.status(400).send({ message: error.message });
  }
};