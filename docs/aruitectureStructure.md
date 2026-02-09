Esta estructura cumple al 100% con los Microservices Guidelines y prepara tu proyecto para producción y pruebas escalables.
BACK


├── docker-compose.yml
├── jest.config.ts
├── package.json
├── tsconfig.json
├── docs/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── scripts/
│   └── init-aws.sh
├── src/
│   ├── app.ts                    # Configuración de Plugins globales
│   ├── index.ts                  # Entry point (Bootstrap)
│   ├── config/
│   │   ├── database.ts           # Prisma Client Singleton
│   │   ├── logger.ts             # Configuración de Pino [MANDATORIO]
│   │   ├── env.ts                # Validación de var de entorno (ej. con envalid)
│   │   └── secrets.ts            # AWS Secrets Manager logic
│   ├── controllers/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   └── auth.routes.ts
│   │   ├── users/                # [CORRECCIÓN: Carpeta por dominio]
│   │   │   ├── user.controller.ts
│   │   │   └── user.routes.ts
│   │   └── health/
│   │       └── health.controller.ts
│   ├── services/
│   │   ├── auth/
│   │   │   └── auth.service.ts
│   │   ├── users/                # [CORRECCIÓN: Carpeta por dominio]
│   │   │   └── user.service.ts
│   │   └── external/
│   │       └── http-client.ts    # Wrapper de Undici (movido de utils) [8]
│   ├── dto/
│   │   ├── auth/
│   │   │   └── login.dto.ts
│   │   └── users/
│   │       ├── create-user.dto.ts
│   │       └── user-response.dto.ts # (Aquí pueden vivir los mappers simples)
│   ├── schemas/                  # Schemas de Validación (Ajv/Fastify)
│   │   ├── auth.schema.ts
│   │   └── user.schema.ts
│   ├── plugins/                  # [REEMPLAZA A MIDDLEWARE]
│   │   ├── auth.plugin.ts        # Lógica de JWT/Cognito
│   │   ├── error-handler.ts      # Manejador global de excepciones
│   │   └── redis.plugin.ts
│   ├── events/                   # [NUEVO: Para escalabilidad futura]
│   │   ├── publishers/
│   │   └── consumers/
│   └── types/
│       └── fastify.d.ts          # Augmentation de tipos (ej. request.user)
└── tests/
    ├── unit/
    │   ├── services/
    │   └── utils/
    └── integration/
        ├── auth/
        └── users/