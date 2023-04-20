import { Injectable } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { createClient } from 'redis';

@Injectable()
export class RedisDbService {
  readonly db: Db;

  constructor(client: MongoClient) {
    this.db = client.db();
    const db1 = createClient();
    db1
  }
}
