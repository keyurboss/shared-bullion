import { DynamicModule, Module, NestModule, Provider } from '@nestjs/common';

import { AppEnvName } from '@rps/bullion-interfaces/core';
import { LoggerModule } from '@bs/core';
import Joi from 'joi';
import { EnvConfigModule } from '../config/env.config.module';
import { defaultValidationSchema } from '../config/validation.schema';
import { TokenModule } from '../core/token.module';
import { APIModule } from './apis/api.module';
import { InterActorModule } from './interactor/interactor.module';
import { RepositoryModule } from './repo/repo.module';

export type AuthServerAppModuleOptions = {
  appEnv: AppEnvName;
};

const services: Provider[] = [];

@Module({
  imports: [
    LoggerModule,
    RepositoryModule,
    APIModule,
    InterActorModule,
    TokenModule,
  ],
  providers: [...services],
})
export class AuthServerAppModule implements NestModule {
  static register({ appEnv }: AuthServerAppModuleOptions): DynamicModule {
    let imports: DynamicModule['imports'] = [
      RepositoryModule.register({ appEnv }),
    ];
    switch (appEnv) {
      case 'ci':
      case 'local':
        imports = [...imports, EnvConfigModule.forRoot()];
        break;
      case 'production':
        imports = [
          ...imports,
          EnvConfigModule.forRoot({
            validationSchema: {
              ...defaultValidationSchema,
              AUTH_DB_URL: Joi.string().uri().required(),
              AUTH_REDIS_URL: Joi.string().uri().required(),
            },
          }),
        ];
        break;
    }

    return {
      module: AuthServerAppModule,
      imports,
    };
  }

  // TODO: Complete MiddleWare
  configure() {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
    // consumer
    //   .apply(AuthMiddleware)
    //   .exclude('/graphql', '/health', '/build-info')
    //   .forRoutes('*');
  }
}
