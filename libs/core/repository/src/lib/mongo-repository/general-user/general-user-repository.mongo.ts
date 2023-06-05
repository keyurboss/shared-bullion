import { GeneralUserId } from '@rps/bullion-interfaces';
import { LoggerFactory, MongoDbService } from '@rps/bullion-server-core';
import {
  GeneralUserOptions,
  GeneralUserRoot,
} from '@rps/bullion-validator-roots';
import { GeneralUserFilter, GeneralUserRepository } from '../../interface';
import { Inject } from '@nestjs/common';

export const generalUserCollection = 'GeneralUser';

export type GeneralUserDocument = GeneralUserOptions & {
  _id: GeneralUserId;
};

export class GeneralUserMongoRepository extends GeneralUserRepository {
  private readonly collection;
  private readonly logger;

  constructor(
    @Inject(MongoDbService) { db }: MongoDbService,
    @Inject(LoggerFactory) loggerFactory: LoggerFactory
  ) {
    super();
    this.collection = db.collection<GeneralUserRoot>(generalUserCollection);
    this.logger = loggerFactory.create(this.constructor.name);
  }

  async find(filter?: GeneralUserFilter): Promise<GeneralUserRoot[]> {
    const cursor = filter
      ? this.collection.find(filter)
      : this.collection.find();
    const users = await cursor.toArray();
    return users.map((user) => GeneralUserRoot.fromJson(user));
  }

  async findByIds(ids: Array<GeneralUserId>): Promise<GeneralUserRoot[]> {
    const users = await this.collection
      .find({
        id: {
          $in: ids,
        },
      })
      .toArray();
    return users.map((user) => GeneralUserRoot.fromJson(user));
  }

  async findOne(id: GeneralUserId): Promise<GeneralUserRoot | undefined> {
    const user = await this.collection.findOne({
      id,
    });
    return typeof user !== 'undefined' && user !== null
      ? GeneralUserRoot.fromJson(user)
      : undefined;
  }

  async save(entity: GeneralUserRoot): Promise<void> {
    const data = entity.toJson();

    await this.collection.updateOne(
      { id: entity.id },
      { $set: data },
      { upsert: true }
    );

    this.logger.debug(
      `Persisted GeneralUser (${entity.id}): ${JSON.stringify(data)}`
    );
  }
}
