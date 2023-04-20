import { RedisLocalClient } from './redis-client.local.client';

export const redisClientLocalFactory = async () => {
  return new RedisLocalClient();
};
