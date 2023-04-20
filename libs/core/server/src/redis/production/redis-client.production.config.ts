export type MongoClientProductionConfigOptions = {
  urlKey: string;
  passwordKey?: string;
};

export class MongoClientProductionConfig {
  readonly url:string;
  readonly password:string;

  constructor({ urlKey, passwordKey }: MongoClientProductionConfigOptions) {
    const url = process.env[urlKey];
    // assert(url, `${urlKey} must be set`);
    this.url = url;

    if (passwordKey) {
      this.password = process.env[passwordKey];
    }
  }
}
