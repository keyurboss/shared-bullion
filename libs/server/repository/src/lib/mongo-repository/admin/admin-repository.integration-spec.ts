import {
  LoggerFactory,
  MongoDbService,
  MongoRepositoryLocalModule,
} from '@bs/core';
import { AdminFixtureFactory, AdminRoot } from '@bs/validator-roots';
import { Test, TestingModule } from '@nestjs/testing';
import { randUuid } from '@ngneat/falso';
import { AdminId, EntityNotFoundError } from '@rps/bullion-interfaces';
import { Collection } from 'mongodb';
import { AdminsRepository } from '../../interface';
import {
  AdminsCollection,
  AdminsDocument,
  AdminsMongoRepository,
} from './admin-repository.mongo';

describe(AdminsRepository.name, () => {
  let repo: AdminsRepository;
  let module: TestingModule;
  let collection: Collection<AdminsDocument>;
  beforeEach(async () => {
    const loggerMock = {
      debug: jest.fn(),
    };
    const loggerFactoryMock = {
      create: jest.fn().mockReturnValue(loggerMock),
    };
    module = await Test.createTestingModule({
      imports: [MongoRepositoryLocalModule],
      providers: [
        {
          provide: AdminsRepository,
          useClass: AdminsMongoRepository,
        },
      ],
    })
      .useMocker((token) => {
        switch (token) {
          case LoggerFactory:
            return loggerFactoryMock;
        }
        return undefined;
      })
      .compile();

    repo = module.get(AdminsRepository);
    collection = module
      .get(MongoDbService)
      .db.collection<AdminsDocument>(AdminsCollection);
  });
  afterEach(async () => {
    await module.close();
  });
  describe('with empty state', () => {
    describe(AdminsMongoRepository.prototype.find.name, () => {
      it('returns no results', async () => {
        const result = await repo.find();
        return expect(result).toStrictEqual([]);
      });
    });

    describe(AdminsMongoRepository.prototype.findOne.name, () => {
      it('returns undefined', async () => {
        const result = await repo.findOne(randUuid() as AdminId);
        return expect(result).toBe(undefined);
      });
    });

    describe(AdminsMongoRepository.prototype.findOneOrFail.name, () => {
      it('returns an error, given non-existing Id', async () => {
        const resultPromise = repo.findOneOrFail(randUuid() as AdminId);
        return expect(resultPromise).rejects.toBeInstanceOf(
          EntityNotFoundError,
        );
      });
    });

    describe(AdminsMongoRepository.prototype.findByIds.name, () => {
      it('returns no results, given non-existing ids', async () => {
        const result = await repo.findByIds([
          randUuid() as AdminId,
          randUuid() as AdminId,
          randUuid() as AdminId,
        ]);
        return expect(result).toStrictEqual([]);
      });
    });
  });
  describe('given prior state of Entities', () => {
    let entities: Array<AdminRoot>;
    let id: AdminId;

    beforeEach(async () => {
      id = randUuid() as AdminId;

      entities = AdminFixtureFactory.createMany([{ id }, {}]);
      await collection.insertMany(
        entities.map(
          (entity) =>
            ({
              ...entity.toJson(),
            } as AdminsDocument),
        ),
      );
    });

    describe(AdminsMongoRepository.prototype.find.name, () => {
      it('returns with Entity Instance', async () => {
        const result = await repo.find({
          id,
        });
        return expect(result).toStrictEqual([entities[0]]);
      });
      it('returns All The data', async () => {
        const result = await repo.find();
        return expect(result).toStrictEqual(entities);
      });
    });

    describe(AdminsMongoRepository.prototype.findOne.name, () => {
      it('returns Entity Instance', async () => {
        const result = await repo.findOne(id);
        return expect(result).toStrictEqual(entities[0]);
      });
    });

    describe(AdminsMongoRepository.prototype.findOneOrFail.name, () => {
      it('returns an Entity, given existing AdminId', async () => {
        const resultPromise = repo.findOneOrFail(id);
        return expect(resultPromise).resolves.toBeInstanceOf(AdminRoot);
      });
    });

    describe(AdminsMongoRepository.prototype.findByIds.name, () => {
      it('returns no results, given non-existing ids', async () => {
        const result = await repo.findByIds(entities.map(({ id }) => id));
        expect(result).toHaveLength(entities.length);
        return expect(result).toStrictEqual(expect.arrayContaining(entities));
      });
    });
  });
});
