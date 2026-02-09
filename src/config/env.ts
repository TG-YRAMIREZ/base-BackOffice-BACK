import { cleanEnv, str, port, num } from 'envalid';

export const env = cleanEnv(process.env, {
  // Core & Aplicación
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
  PORT: port({ default: 3000 }),
  SERVICE_NAME: str({ default: 'backoffice-backend' }),
  LOG_LEVEL: str({ choices: ['info', 'debug', 'error', 'warn'], default: 'info' }),

  // Base de Datos (Prisma)
  DATABASE_URL: str(),
  DATABASE_POOL_SIZE: num({ default: 10 }), // Valor por defecto según lineamientos

  // AWS Infra
  AWS_REGION: str(),
  AWS_ACCESS_KEY_ID: str(),
  AWS_SECRET_ACCESS_KEY: str(),
  
  // Secrets Manager (Mandatorio para Cloud)
  DATABASE_SECRET_NAME: str(),
  SECRETS_MANAGER_REGION: str(),

  // BO-3: Cognito (Autenticación)
  COGNITO_USER_POOL_ID: str(),
  COGNITO_CLIENT_ID: str(),
  COGNITO_REGION: str(),

  // BO-4: S3 (Expedientes)
  S3_DOCUMENTS_BUCKET: str(),
  S3_REGION: str(),
});