import { requireNotNullish } from '@rps/bullion-interfaces';

export type RedisClientProductionConfigOptions = {
  urlKey: string;
  passwordKey?: string;
  userNameKey?: string;
};

export class RedisClientProductionConfig {
  readonly url!: string;
  readonly password!: string;
  readonly userName!: string;

  constructor({
    urlKey,
    passwordKey,
    userNameKey,
  }: RedisClientProductionConfigOptions) {
    const url = process.env[urlKey]??"";
    // assert(url, `${urlKey} must be set`);
    requireNotNullish(url);
    this.url = url;

    if (passwordKey) {
      this.password = process.env[passwordKey] ?? '';
    }
    if (userNameKey) {
      this.userName = process.env[userNameKey] ?? '';
    }
  }
}
