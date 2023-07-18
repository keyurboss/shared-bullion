import { DynamicModule, Module, NestModule } from '@nestjs/common';

import { AppEnvName } from '@rps/bullion-interfaces/core';
import {
  MongoRepositoryLocalModule,
  MongoRepositoryProductionModule,
  RedisRepositoryLocalModule,
  RedisRepositoryProductionModule,
} from '@rps/bullion-server-core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EnvConfigModule} from '../config/env.config.module';
import { defaultValidationSchema } from '../config/validation.schema';
import * as Joi from 'joi';
export type AuthServerAppModuleOptions = {
  appEnv: AppEnvName;
};
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AuthServerAppModule implements NestModule {
  static register({ appEnv }: AuthServerAppModuleOptions): DynamicModule {
    let imports: DynamicModule['imports'] = [];
    switch (appEnv) {
      case 'ci':
      case 'local':
        imports = [
          ...imports,
          MongoRepositoryLocalModule,
          RedisRepositoryLocalModule,
          EnvConfigModule,
        ];
        break;
      case 'production':
        imports = [
          ...imports,
          EnvConfigModule.forRoot({
            ...defaultValidationSchema,
            AUTH_DB_URL: Joi.string().uri().required(),
            AUTH_REDIS_URL: Joi.string().uri().required(),
          }),
          MongoRepositoryProductionModule.forRoot({
            urlKey: 'AUTH_DB_URL',
            tlsCaKey: 'AUTH_DB_TLS_CA',
          }),
          RedisRepositoryProductionModule.forRoot({
            urlKey: 'AUTH_REDIS_URL',
            userNameKey: 'AUTH_REDIS_USERNAME',
            passwordKey: 'AUTH_REDIS_PASSWORD',
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
