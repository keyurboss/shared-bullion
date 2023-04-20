import {
  Global,
  Module
} from '@nestjs/common';

import { RedisDbHealthIndicator } from '../redis-db.health';
import { RedisDbService } from '../redis-db.service';
import { RedisClient } from '../redis.token';
import { redisClientLocalFactory } from './redis-client.local.factory';

@Global()
@Module({
  providers: [
    RedisDbService,
    {
      provide: RedisClient,
      useFactory: redisClientLocalFactory,
    },
    RedisDbHealthIndicator,
  ],
  exports: [RedisDbService, RedisDbHealthIndicator],
})
export class RedisRepositoryLocalModule  {
}
