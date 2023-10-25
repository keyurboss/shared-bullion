import { Inject, OnModuleInit, Optional } from '@nestjs/common';
import { FixtureMongoService, LoggerFactory, MongoDbService } from '@bs/core';
import { AdminId } from '@rps/bullion-interfaces';
import { AdminOptions, AdminRoot } from '@bs/validator-roots';
import { AdminFilter, AdminsRepository } from '../../interface';

export const AdminsCollection = 'Admins';
export const AdminsCollectionSeedFileName = 'AdminsCollectionSeedFileName';

export type AdminsDocument = AdminOptions & {
  _id: AdminId;
};

export class AdminsMongoRepository
  extends AdminsRepository
  implements OnModuleInit
{
  private readonly collection;
  private readonly logger;

  constructor(
    @Inject(MongoDbService) { db }: MongoDbService,
    @Inject(LoggerFactory) loggerFactory: LoggerFactory,
    @Inject(FixtureMongoService)
    @Optional()
    private readonly fixtureService: FixtureMongoService,
    @Inject(AdminsCollectionSeedFileName)
    @Optional()
    private readonly fileName = 'admins.data.json',
  ) {
    super();
    this.collection = db.collection<AdminRoot>(AdminsCollection);
    this.logger = loggerFactory.create(this.constructor.name);
  }

  async onModuleInit() {
    if (this.fixtureService !== null) {
      await this.fixtureService
        .seedFixtures(AdminsCollection, this.fileName)
        .catch((e) => {
          this.logger.error(e.message, e);
        });
    }
  }

  async find(filter?: AdminFilter): Promise<AdminRoot[]> {
    const cursor = filter
      ? this.collection.find(filter)
      : this.collection.find();
    const users = await cursor.toArray();
    return users.map((user) => AdminRoot.fromJson(user));
  }

  async findByIds(ids: Array<AdminId>): Promise<AdminRoot[]> {
    const bullions = await this.collection
      .find({
        id: {
          $in: ids,
        },
      })
      .toArray();
    return bullions.map((bullion) => AdminRoot.fromJson(bullion));
  }

  async findOne(id: AdminId): Promise<AdminRoot | undefined> {
    const bullion = await this.collection.findOne({
      id,
    });
    return typeof bullion !== 'undefined' && bullion !== null
      ? AdminRoot.fromJson(bullion)
      : undefined;
  }

  async save(entity: AdminRoot): Promise<void> {
    const data = entity.toJson();

    await this.collection.updateOne(
      { id: entity.id },
      { $set: data },
      { upsert: true },
    );

    this.logger.debug(
      `Persisted ${this.rootName} (${entity.id}): ${JSON.stringify(data)}`,
    );
  }
}
