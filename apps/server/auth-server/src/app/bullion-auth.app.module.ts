import { DynamicModule, Module, NestModule, Provider } from '@nestjs/common';

import { AppEnvName } from '@rps/bullion-interfaces/core';
import {
  FixturesModule,
  JwtService,
  LoggerModule,
  MongoRepositoryLocalModule,
  MongoRepositoryProductionModule,
  RedisRepositoryLocalModule,
  RedisRepositoryProductionModule,
} from '@rps/bullion-server-core';
import Joi from 'joi';
import { resolve } from 'path';
import { AppConfig } from '../config/app.config';
import { EnvConfigModule } from '../config/env.config.module';
import {
  ACCESS_TOKEN_SERVICE,
  REFRESH_TOKEN_SERVICE,
} from '../config/service.token';
import { defaultValidationSchema } from '../config/validation.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoryModule } from './repo/repo.module';

export type AuthServerAppModuleOptions = {
  appEnv: AppEnvName;
};

const services: Provider[] = [
  AppService,
  {
    provide: REFRESH_TOKEN_SERVICE,
    useClass: JwtService,
  },
];

@Module({
  imports: [LoggerModule, RepositoryModule],
  controllers: [AppController],
  providers: [...services],
})
export class AuthServerAppModule implements NestModule {
  static register({ appEnv }: AuthServerAppModuleOptions): DynamicModule {
    let imports: DynamicModule['imports'] = [];
    const providers: DynamicModule['providers'] = [
      {
        provide: REFRESH_TOKEN_SERVICE,
        useFactory: (config: AppConfig) => {
          return new JwtService(config.accessTokenKey);
        },
        inject: [AppConfig],
      },
      {
        provide: ACCESS_TOKEN_SERVICE,
        useFactory: (config: AppConfig) => {
          return new JwtService(config.accessTokenKey);
        },
        inject: [AppConfig],
      },
    ];
    switch (appEnv) {
      case 'ci':
      case 'local':
        imports = [
          ...imports,
          MongoRepositoryLocalModule,
          RedisRepositoryLocalModule,
          FixturesModule.forRoot(resolve(__dirname, 'assets', 'fixtures')),
          EnvConfigModule.forRoot(),
        ];
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
      providers,
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
