export const createUserSchema = {
  body: {
    type: 'object',
    required: ['email', 'modules', 'canDownloadPii'],
    properties: {
      email: { 
        type: 'string', 
        format: 'email', 
        pattern: '^.*@provident\\.com\\.mx$' // Restricción institucional
      },
      modules: { 
        type: 'array', 
        items: { type: 'string', enum: ['USER_ADMIN', 'EXP_CLIENTE', 'CAMPAIGNS'] } 
      },
      documentPermissions: { 
        type: 'array', 
        items: { type: 'string', enum: ['DOC_INE', 'DOC_CIS', 'DOC_CONTRATO'] } 
      },
      canDownloadPii: { type: 'boolean' }
    }
  }
};