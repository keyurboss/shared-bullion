import { DynamicModule, Module, NestModule } from '@nestjs/common';

import { AppEnvName } from '@rps/bullion-interfaces/core';
import {
  MongoRepositoryLocalModule,
  MongoRepositoryProductionModule,
  RedisRepositoryLocalModule,
  RedisRepositoryProductionModule,
} from '@rps/server-core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
        ];
        break;
      case 'production':
        imports = [
          ...imports,
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
