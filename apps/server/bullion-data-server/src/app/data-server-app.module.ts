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
import { EnvConfigModule } from './env/env.module';
export type DataServerAppModuleOptions = {
  appEnv: AppEnvName;
};
@Module({
  imports: [EnvConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class DataServerAppModule implements NestModule {
  static register({ appEnv }: DataServerAppModuleOptions): DynamicModule {
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
            urlKey: 'DATA_DB_URL',
            tlsCaKey: 'DATA_DB_TLS_CA',
          }),
          RedisRepositoryProductionModule.forRoot({
            urlKey: 'DATA_REDIS_URL',
            userNameKey: 'DATA_REDIS_USERNAME',
            passwordKey: 'DATA_REDIS_PASSWORD',
          }),
        ];
        break;
    }

    return {
      module: DataServerAppModule,
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
