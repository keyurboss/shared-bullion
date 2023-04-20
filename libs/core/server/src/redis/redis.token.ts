// export const REDIS_CLIENT = 'REDIS_CLIENT';
/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class RedisClient {
  protected readonly DATA: Record<string, any> = {};

  abstract SET(key: string | number, value: any): Promise<void>;
  async set(key: string | number, value: any) {
    this.SET(key, value);
  }
  async get<T extends string>(key: string | number): Promise<T> {
    return this.GET<T>(key);
  }
  abstract GET<T extends string>(key: string | number): Promise<T>;

  async hSet(key: string | number, field: string | number, value: any) {
    return this.HSET(key, field, value);
  }
  abstract HSET(
    key: string | number,
    field: string | number,
    value: any
  ): Promise<void>;
}
