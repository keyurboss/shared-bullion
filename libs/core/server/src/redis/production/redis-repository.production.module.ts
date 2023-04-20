import {
  DynamicModule,
  Global,
  Module,
  ModuleMetadata,
  OnModuleDestroy,
} from '@nestjs/common';
import { MongoClient } from 'mongodb';

import { RedisDbHealthIndicator } from '../redis-db.health';
import { RedisDbService } from '../redis-db.service';
import {
  MongoClientProductionConfig,
  MongoClientProductionConfigOptions,
} from './redis-client.production.config';
import { mongoClientProductionFactory } from './redis-client.production.factory';

export type MongoRepositoryProductionModuleConfig =
  MongoClientProductionConfigOptions;

@Global()
@Module({
  providers: [
    RedisDbService,
    {
      provide: MongoClient,
      useFactory: mongoClientProductionFactory,
      inject: [MongoClientProductionConfig],
    },
    RedisDbHealthIndicator,
  ],
  exports: [RedisDbService, MongoDbHealthIndicator],
})
export class MongoRepositoryProductionModule implements OnModuleDestroy {
  constructor(private readonly client: MongoClient) {}

  static forRoot({
    urlKey,
    tlsCaKey,
  }: MongoRepositoryProductionModuleConfig): DynamicModule {
    const providers: ModuleMetadata['providers'] = [
      {
        provide: MongoClientProductionConfig,
        useFactory: () => new MongoClientProductionConfig({ urlKey, tlsCaKey }),
      },
    ];

    return {
      module: MongoRepositoryProductionModule,
      providers,
    };
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
