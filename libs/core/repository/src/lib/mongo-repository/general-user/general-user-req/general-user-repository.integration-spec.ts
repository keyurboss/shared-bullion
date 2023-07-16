import { Test, TestingModule } from '@nestjs/testing';
import { randUuid } from '@ngneat/falso';
import {
  EntityNotFoundError,
  GeneralUserId,
  GeneralUserReqId,
} from '@rps/bullion-interfaces';
import {
  LoggerFactory,
  MongoDbService,
  MongoRepositoryLocalModule,
} from '@rps/bullion-server-core';
import {
  GeneralUserReqFixtureFactory,
  GeneralUserReqRoot,
} from '@rps/bullion-validator-roots';
import { Collection } from 'mongodb';
import { GeneralUserReqRepository } from '../../../interface';
import {
  GeneralUserReqDocument,
  GeneralUserReqMongoRepository,
  generalUserReqCollection,
} from './general-user-repository.mongo';

describe(GeneralUserReqRepository.name, () => {
  let generalUserReqRepository: GeneralUserReqRepository;
  let module: TestingModule;
  let collection: Collection<GeneralUserReqDocument>;
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
          provide: GeneralUserReqRepository,
          useClass: GeneralUserReqMongoRepository,
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

    generalUserReqRepository = module.get(GeneralUserReqRepository);
    collection = module
      .get(MongoDbService)
      .db.collection<GeneralUserReqDocument>(generalUserReqCollection);
  });
  afterEach(async () => {
    await module.close();
  });
  describe('with empty state', () => {
    describe(GeneralUserReqMongoRepository.prototype.find.name, () => {
      it('returns no results', async () => {
        const result = await generalUserReqRepository.find();
        return expect(result).toStrictEqual([]);
      });
    });

    describe(GeneralUserReqMongoRepository.prototype.findOne.name, () => {
      it('returns undefined', async () => {
        const result = await generalUserReqRepository.findOne(
          randUuid() as GeneralUserReqId,
        );
        return expect(result).toBe(undefined);
      });
    });

    describe(GeneralUserReqMongoRepository.prototype.findOneOrFail.name, () => {
      it('returns an error, given non-existing GeneralUser Id', async () => {
        const resultPromise = generalUserReqRepository.findOneOrFail(
          randUuid() as GeneralUserReqId,
        );
        return expect(resultPromise).rejects.toBeInstanceOf(
          EntityNotFoundError,
        );
      });
    });

    describe(
      GeneralUserReqMongoRepository.prototype.findOneByGeneralUserId.name,
      () => {
        it('returns undefined', async () => {
          const result = await generalUserReqRepository.findOneByGeneralUserId(
            randUuid() as GeneralUserId,
          );
          return expect(result).toBe(undefined);
        });
      },
    );
    describe(
      GeneralUserReqMongoRepository.prototype.findOneByGeneralUserIdOrFail.name,
      () => {
        it('returns undefined', async () => {
          const resultPromise =
            generalUserReqRepository.findOneByGeneralUserIdOrFail(
              randUuid() as GeneralUserId,
            );
          return expect(resultPromise).rejects.toBeInstanceOf(
            EntityNotFoundError,
          );
        });
      },
    );

    describe(GeneralUserReqMongoRepository.prototype.findByIds.name, () => {
      it('returns no results, given non-existing GeneralUser ids', async () => {
        const result = await generalUserReqRepository.findByIds([
          randUuid() as GeneralUserReqId,
          randUuid() as GeneralUserReqId,
          randUuid() as GeneralUserReqId,
        ]);
        return expect(result).toStrictEqual([]);
      });
    });
  });
  describe('given prior state of GeneralUsers', () => {
    let entities: Array<GeneralUserReqRoot>;
    let id: GeneralUserReqId;
    let generalUserId: GeneralUserId;

    beforeEach(async () => {
      id = randUuid() as GeneralUserReqId;
      generalUserId = randUuid() as GeneralUserId;

      entities = GeneralUserReqFixtureFactory.createMany([
        { id },
        { generalUserId },
      ]);
      await collection.insertMany(
        entities.map(
          (generalUser) =>
            ({
              ...generalUser.toJson(),
            } as GeneralUserReqDocument),
        ),
      );
    });

    describe(GeneralUserReqMongoRepository.prototype.find.name, () => {
      it('returns with GeneralUser Intance', async () => {
        const result = await generalUserReqRepository.find({
          id,
        });
        return expect(result).toStrictEqual([entities[0]]);
      });
      it('returns All The data', async () => {
        const result = await generalUserReqRepository.find();
        return expect(result).toStrictEqual(entities);
      });
    });

    describe(GeneralUserReqMongoRepository.prototype.findOne.name, () => {
      it('returns General User Req Instance', async () => {
        const result = await generalUserReqRepository.findOne(id);
        return expect(result).toStrictEqual(entities[0]);
      });
    });

    describe(GeneralUserReqMongoRepository.prototype.findOneOrFail.name, () => {
      it('returns an General User Req, given existing GeneralUserReqId', async () => {
        const resultPromise = generalUserReqRepository.findOneOrFail(id);
        return expect(resultPromise).resolves.toBeInstanceOf(
          GeneralUserReqRoot,
        );
      });
    });

    describe(
      GeneralUserReqMongoRepository.prototype.findOneByGeneralUserId.name,
      () => {
        it('returns General User Req Instance,With GeneralUSerID', async () => {
          const result = await generalUserReqRepository.findOneByGeneralUserId(
            generalUserId,
          );
          expect(result).toBeInstanceOf(GeneralUserReqRoot);
          expect(result).toStrictEqual(
            expect.objectContaining({ generalUserId }),
          );
        });
      },
    );
    describe(
      GeneralUserReqMongoRepository.prototype.findOneByGeneralUserIdOrFail.name,
      () => {
        it('returns General User Req Instance,With GeneralUSerID', async () => {
          const result =
            await generalUserReqRepository.findOneByGeneralUserIdOrFail(
              generalUserId,
            );
          expect(result).toBeInstanceOf(GeneralUserReqRoot);
          expect(result).toStrictEqual(
            expect.objectContaining({ generalUserId }),
          );
        });
      },
    );
    describe(GeneralUserReqMongoRepository.prototype.findByIds.name, () => {
      it('returns no results, given non-existing GeneralUser ids', async () => {
        const result = await generalUserReqRepository.findByIds(
          entities.map(({ id }) => id),
        );
        expect(result).toHaveLength(entities.length);
        return expect(result).toStrictEqual(expect.arrayContaining(entities));
      });
    });
  });
});
