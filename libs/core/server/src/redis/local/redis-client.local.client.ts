import { RedisCommandArgument } from '@redis/client/dist/lib/commands';
import { RedisClient } from '../redis.token';
/* eslint-disable @typescript-eslint/no-explicit-any */
export class RedisLocalClient extends RedisClient {
  async PING(message?: RedisCommandArgument): Promise<string> {
    return message.toString() ?? 'ok';
  }
  async SET(key: string | number, value: any) {
    this.DATA[key] = value;
  }
  async GET(key: string | number) {
    const value = this.DATA[key];
    if (typeof value === 'undefined') {
      throw 'Key Not Found';
    }
    return value;
  }
  async HSET(
    key: string | number,
    field: string | number,
    value: any
  ): Promise<void> {
    let d = this.DATA[key];
    if (typeof d === 'undefined') {
      d = {};
    }
    d[field] = value;
    this.DATA[key] = d;
  }
}
