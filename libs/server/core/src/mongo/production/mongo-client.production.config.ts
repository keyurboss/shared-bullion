import { requireNotNullish } from '@rps/bullion-interfaces';

export type MongoClientProductionConfigOptions = {
  urlKey: string;
  tlsCaKey?: string;
};

export class MongoClientProductionConfig {
  readonly url: string;
  readonly tlsCa?: string;

  constructor({ urlKey, tlsCaKey }: MongoClientProductionConfigOptions) {
    const url = process.env[urlKey] ?? '';
    requireNotNullish(url);
    // assert(url, `${urlKey} must be set`);
    this.url = url;

    if (tlsCaKey) {
      this.tlsCa = process.env[tlsCaKey];
    }
  }
}
