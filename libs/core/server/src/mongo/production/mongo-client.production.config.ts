export type MongoClientProductionConfigOptions = {
  urlKey: string;
  tlsCaKey?: string;
};

export class MongoClientProductionConfig {
  readonly url;
  readonly tlsCa;

  constructor({ urlKey, tlsCaKey }: MongoClientProductionConfigOptions) {
    const url = process.env[urlKey];
    // assert(url, `${urlKey} must be set`);
    this.url = url;

    if (tlsCaKey) {
      this.tlsCa = process.env[tlsCaKey];
    }
  }
}
