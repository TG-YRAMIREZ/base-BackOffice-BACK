import fp from 'fastify-plugin';
import fastifyRedis from '@fastify/redis';

export default fp(async (fastify) => {
  // Registramos el plugin oficial que gestiona el ciclo de vida (onClose)
  await fastify.register(fastifyRedis, {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    // Esto nos permite usar fastify.redis
  });

  // Decoramos con un helper para la lógica de "Cache-Aside"
  fastify.decorate('userCache', {
    async getPermissions(userId: string) {
      const data = await fastify.redis.get(`user:perm:${userId}`);
      return data ? JSON.parse(data) : null;
    },
    async setPermissions(userId: string, permissions: any) {
      // Guardamos con un TTL de 15 minutos (900 segundos)
      await fastify.redis.set(
        `user:perm:${userId}`,
        JSON.stringify(permissions),
        'EX',
        900
      );
    },
    async invalidate(userId: string) {
      await fastify.redis.del(`user:perm:${userId}`);
    }
  });
});

// Tipado para que TS reconozca fastify.userCache
declare module 'fastify' {
  interface FastifyInstance {
    userCache: {
      getPermissions(userId: string): Promise<any>;
      setPermissions(userId: string, permissions: any): Promise<void>;
      invalidate(userId: string): Promise<void>;
    };
  }
}