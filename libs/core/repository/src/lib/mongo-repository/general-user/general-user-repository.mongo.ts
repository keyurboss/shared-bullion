import { GeneralUserId } from '@rps/bullion-interfaces';
import {
  FixtureService,
  LoggerFactory,
  MongoDbService,
} from '@rps/bullion-server-core';
import {
  GeneralUserOptions,
  GeneralUserRoot,
} from '@rps/bullion-validator-roots';
import { GeneralUserFilter, GeneralUserRepository } from '../../interface';
import { Inject, OnModuleInit, Optional } from '@nestjs/common';

export const generalUserCollection = 'GeneralUser';
export const GeneralUserSeedFileName = 'GeneralUserSeedFileName';

export type GeneralUserDocument = GeneralUserOptions & {
  _id: GeneralUserId;
};

export class GeneralUserMongoRepository
  extends GeneralUserRepository
  implements OnModuleInit
{
  private readonly collection;
  private readonly logger;

  constructor(
    @Inject(MongoDbService) { db }: MongoDbService,
    @Inject(LoggerFactory) loggerFactory: LoggerFactory,
    @Inject(FixtureService)
    @Optional()
    private readonly fixtureService: FixtureService,
    @Inject(GeneralUserSeedFileName)
    @Optional()
    private readonly fileName = 'general-user.data.json'
  ) {
    super();
    this.collection = db.collection<GeneralUserRoot>(generalUserCollection);
    this.logger = loggerFactory.create(this.constructor.name);
  }

  async onModuleInit() {
    if (this.fixtureService !== null) {
      await this.fixtureService
        .seedFixtures(generalUserCollection, this.fileName)
        .catch((e) => {
          this.logger.error(e.message, e);
        });
    }
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
