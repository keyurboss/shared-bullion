import { Inject, OnModuleInit, Optional } from '@nestjs/common';
import { GeneralUserId, GeneralUserReqId } from '@rps/bullion-interfaces';
import {
  FixtureService,
  LoggerFactory,
  MongoDbService,
} from '@rps/bullion-server-core';
import {
  GeneralUserOptions,
  GeneralUserReqRoot,
} from '@rps/bullion-validator-roots';
import {
  GeneralUserReqFilter,
  GeneralUserReqRepository,
} from '../../../interface';

export const generalUserReqCollection = 'GeneralUserReq';
export const GeneralUserReqSeedFileName = 'GeneralUserReqSeedFileName';

export type GeneralUserReqDocument = GeneralUserOptions & {
  _id: GeneralUserReqId;
};

export class GeneralUserReqMongoRepository
  extends GeneralUserReqRepository
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
    @Inject(GeneralUserReqSeedFileName)
    @Optional()
    private readonly fileName = 'general-user.data.json',
  ) {
    super();
    this.collection = db.collection<GeneralUserReqRoot>(
      generalUserReqCollection,
    );
    this.logger = loggerFactory.create(this.constructor.name);
  }

  async onModuleInit() {
    if (this.fixtureService !== null) {
      await this.fixtureService
        .seedFixtures(generalUserReqCollection, this.fileName)
        .catch((e) => {
          this.logger.error(e.message, e);
        });
    }
  }

  override async findOneByGeneralUserId(
    id: GeneralUserId,
  ): Promise<GeneralUserReqRoot | undefined> {
    const entity = await this.collection.findOne({
      generalUserId: id,
    });
    return typeof entity !== 'undefined' && entity !== null
      ? GeneralUserReqRoot.fromJson(entity)
      : undefined;
  }

  async find(filter?: GeneralUserReqFilter): Promise<GeneralUserReqRoot[]> {
    const cursor = filter
      ? this.collection.find(filter)
      : this.collection.find();
    const users = await cursor.toArray();
    return users.map((user) => GeneralUserReqRoot.fromJson(user));
  }

  async findByIds(ids: Array<GeneralUserReqId>): Promise<GeneralUserReqRoot[]> {
    const users = await this.collection
      .find({
        id: {
          $in: ids,
        },
      })
      .toArray();
    return users.map((user) => GeneralUserReqRoot.fromJson(user));
  }

  async findOne(id: GeneralUserReqId): Promise<GeneralUserReqRoot | undefined> {
    const user = await this.collection.findOne({
      id,
    });
    return typeof user !== 'undefined' && user !== null
      ? GeneralUserReqRoot.fromJson(user)
      : undefined;
  }

  async save(entity: GeneralUserReqRoot): Promise<void> {
    const data = entity.toJson();

    await this.collection.updateOne(
      { id: entity.id },
      { $set: data },
      { upsert: true },
    );

    this.logger.debug(
      `Persisted GeneralUser (${entity.id}): ${JSON.stringify(data)}`,
    );
  }
}
