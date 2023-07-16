import { Test, TestingModule } from '@nestjs/testing';
import { randUuid } from '@ngneat/falso';
import { EntityNotFoundError, GeneralUserId } from '@rps/bullion-interfaces';
import {
  LoggerFactory,
  MongoDbService,
  MongoRepositoryLocalModule,
} from '@rps/bullion-server-core';
import {
  GeneralUserFixtureFactory,
  GeneralUserRoot,
} from '@rps/bullion-validator-roots';
import { Collection } from 'mongodb';
import { GeneralUserRepository } from '../../interface';
import {
  GeneralUserDocument,
  GeneralUserMongoRepository,
  generalUserCollection,
} from './general-user-repository.mongo';

describe(GeneralUserRepository.name, () => {
  let generalUserRepository: GeneralUserRepository;
  let module: TestingModule;
  let collection: Collection<GeneralUserDocument>;
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
          provide: GeneralUserRepository,
          useClass: GeneralUserMongoRepository,
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

    generalUserRepository = module.get(GeneralUserRepository);
    collection = module
      .get(MongoDbService)
      .db.collection<GeneralUserDocument>(generalUserCollection);
  });
  afterEach(async () => {
    await module.close();
  });
  describe('with empty state', () => {
    describe(GeneralUserMongoRepository.prototype.find.name, () => {
      it('returns no results', async () => {
        const result = await generalUserRepository.find();
        return expect(result).toStrictEqual([]);
      });
    });

    describe(GeneralUserMongoRepository.prototype.findOne.name, () => {
      it('returns undefined', async () => {
        const result = await generalUserRepository.findOne(
          randUuid() as GeneralUserId,
        );
        return expect(result).toBe(undefined);
      });
    });

    describe(GeneralUserMongoRepository.prototype.findOneOrFail.name, () => {
      it('returns an error, given non-existing GeneralUser Id', async () => {
        const resultPromise = generalUserRepository.findOneOrFail(
          randUuid() as GeneralUserId,
        );
        return expect(resultPromise).rejects.toBeInstanceOf(
          EntityNotFoundError,
        );
      });
    });

    describe(GeneralUserMongoRepository.prototype.findByIds.name, () => {
      it('returns no results, given non-existing GeneralUser ids', async () => {
        const result = await generalUserRepository.findByIds([
          randUuid() as GeneralUserId,
          randUuid() as GeneralUserId,
          randUuid() as GeneralUserId,
        ]);
        return expect(result).toStrictEqual([]);
      });
    });
  });
  describe('given prior state of GeneralUsers', () => {
    let generalUsers: Array<GeneralUserRoot>;
    let generalUserId: GeneralUserId;

    beforeEach(async () => {
      generalUserId = randUuid() as GeneralUserId;

      generalUsers = GeneralUserFixtureFactory.createMany([
        { id: generalUserId },
        {},
      ]);
      await collection.insertMany(
        generalUsers.map(
          (generalUser) =>
            ({
              ...generalUser.toJson(),
            } as GeneralUserDocument),
        ),
      );
    });

    describe(GeneralUserMongoRepository.prototype.find.name, () => {
      it('returns with GeneralUser Intance', async () => {
        const result = await generalUserRepository.find({
          id: generalUserId,
        });
        return expect(result).toStrictEqual([generalUsers[0]]);
      });
      it('returns All The data', async () => {
        const result = await generalUserRepository.find();
        return expect(result).toStrictEqual(generalUsers);
      });
    });

    describe(GeneralUserMongoRepository.prototype.findOne.name, () => {
      it('returns General User Instance', async () => {
        const result = await generalUserRepository.findOne(generalUserId);
        return expect(result).toStrictEqual(generalUsers[0]);
      });
    });

    describe(GeneralUserMongoRepository.prototype.findOneOrFail.name, () => {
      it('returns an General User, given existing GeneralUser Id', async () => {
        const resultPromise =
          generalUserRepository.findOneOrFail(generalUserId);
        return expect(resultPromise).resolves.toBeInstanceOf(GeneralUserRoot);
      });
    });

    describe(GeneralUserMongoRepository.prototype.findByIds.name, () => {
      it('returns no results, given non-existing GeneralUser ids', async () => {
        const result = await generalUserRepository.findByIds(
          generalUsers.map(({ id }) => id),
        );
        expect(result).toHaveLength(generalUsers.length);
        return expect(result).toStrictEqual(
          expect.arrayContaining(generalUsers),
        );
      });
    });
  });
});
