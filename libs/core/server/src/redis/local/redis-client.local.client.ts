/* eslint-disable @typescript-eslint/no-explicit-any */
export class RedisLocalClient {
  private readonly DATA: Record<string, any> = {};

  async SET(key: string | number, value: any) {
    this.DATA[key] = value;
  }
  async set(key: string | number, value: any) {
    this.SET(key, value);
  }
  async get(key: string | number) {
    return this.GET(key);
  }
  async GET(key: string | number) {
    const value = this.DATA[key];
    if (typeof value === 'undefined') {
      throw 'Key Not Found';
    }
    return value;
  }
  async hSet(key: string | number, field: string | number, value: any) {
    return this.hSet(key, field, value);
  }
  async HSET(key: string | number, field: string | number, value: any) {
    let d = this.DATA[key];
    if (typeof d === 'undefined') {
      d = {};
    }
    d[field] = value;
    this.DATA[key] = d;
  }
}
