export const loginSchema = {
  body: {
    type: 'object',
    required: ['email', 'sub', 'fullName'],
    properties: {
      email: { type: 'string', format: 'email' },
      sub: { type: 'string' }, // UUID de Cognito
      fullName: { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            email: { type: 'string' },
            fullName: { type: 'string' },
            lastLogin: { type: ['string', 'null'] }
          }
        },
        permissions: { type: 'array', items: { type: 'string' } },
        accessToken: { type: 'string' }
      }
    },
    403: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};