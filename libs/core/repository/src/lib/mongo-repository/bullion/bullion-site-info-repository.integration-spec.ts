import { Test, TestingModule } from '@nestjs/testing';
import { randUuid } from '@ngneat/falso';
import { BullionId, EntityNotFoundError } from '@rps/bullion-interfaces';
import {
  LoggerFactory,
  MongoDbService,
  MongoRepositoryLocalModule,
} from '@bs/core';
import {
  BullionSiteInfoFixtureFactory,
  BullionSiteInfoRoot,
} from '@rps/bullion-validator-roots';
import { Collection } from 'mongodb';
import { BullionSiteInfoRepository } from '../../interface';
import {
  BullionSiteInfoDocument,
  BullionSiteInfoMongoRepository,
  bullionSiteInfoCollection,
} from './bullion-site-info-repository.mongo';

describe(BullionSiteInfoRepository.name, () => {
  let bullionSiteInfoRepository: BullionSiteInfoRepository;
  let module: TestingModule;
  let collection: Collection<BullionSiteInfoDocument>;
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
          provide: BullionSiteInfoRepository,
          useClass: BullionSiteInfoMongoRepository,
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

    bullionSiteInfoRepository = module.get(BullionSiteInfoRepository);
    collection = module
      .get(MongoDbService)
      .db.collection<BullionSiteInfoDocument>(bullionSiteInfoCollection);
  });
  afterEach(async () => {
    await module.close();
  });
  describe('with empty state', () => {
    describe(BullionSiteInfoMongoRepository.prototype.find.name, () => {
      it('returns no results', async () => {
        const result = await bullionSiteInfoRepository.find();
        return expect(result).toStrictEqual([]);
      });
    });

    describe(BullionSiteInfoMongoRepository.prototype.findOne.name, () => {
      it('returns undefined', async () => {
        const result = await bullionSiteInfoRepository.findOne(
          randUuid() as BullionId,
        );
        return expect(result).toBe(undefined);
      });
    });

    describe(
      BullionSiteInfoMongoRepository.prototype.findOneOrFail.name,
      () => {
        it('returns an error, given non-existing Bullion Id', async () => {
          const resultPromise = bullionSiteInfoRepository.findOneOrFail(
            randUuid() as BullionId,
          );
          return expect(resultPromise).rejects.toBeInstanceOf(
            EntityNotFoundError,
          );
        });
      },
    );

    describe(BullionSiteInfoMongoRepository.prototype.findByIds.name, () => {
      it('returns no results, given non-existing Bullion ids', async () => {
        const result = await bullionSiteInfoRepository.findByIds([
          randUuid() as BullionId,
          randUuid() as BullionId,
          randUuid() as BullionId,
        ]);
        return expect(result).toStrictEqual([]);
      });
    });
  });
  describe('given prior state of Bullion Site Info', () => {
    let bullionSiteInfos: Array<BullionSiteInfoRoot>;
    let bullionId: BullionId;

    beforeEach(async () => {
      bullionId = randUuid() as BullionId;

      bullionSiteInfos = BullionSiteInfoFixtureFactory.createMany([
        { id: bullionId },
        {},
      ]);
      await collection.insertMany(
        bullionSiteInfos.map(
          (bullionSiteInfo) =>
            ({
              ...bullionSiteInfo.toJson(),
            } as BullionSiteInfoDocument),
        ),
      );
    });

    describe(BullionSiteInfoMongoRepository.prototype.find.name, () => {
      it('returns with Bullion Site Info Intance', async () => {
        const result = await bullionSiteInfoRepository.find({
          id: bullionId,
        });
        return expect(result).toStrictEqual([bullionSiteInfos[0]]);
      });
      it('returns All The data', async () => {
        const result = await bullionSiteInfoRepository.find();
        return expect(result).toStrictEqual(bullionSiteInfos);
      });
    });

    describe(BullionSiteInfoMongoRepository.prototype.findOne.name, () => {
      it('returns Bullion Site Info Instance', async () => {
        const result = await bullionSiteInfoRepository.findOne(bullionId);
        return expect(result).toStrictEqual(bullionSiteInfos[0]);
      });
    });

    describe(
      BullionSiteInfoMongoRepository.prototype.findOneOrFail.name,
      () => {
        it('returns an Bullion Site Info, given existing BullionId', async () => {
          const resultPromise =
            bullionSiteInfoRepository.findOneOrFail(bullionId);
          return expect(resultPromise).resolves.toBeInstanceOf(
            BullionSiteInfoRoot,
          );
        });
      },
    );

    describe(BullionSiteInfoMongoRepository.prototype.findByIds.name, () => {
      it('returns no results, given non-existing Bullion ids', async () => {
        const result = await bullionSiteInfoRepository.findByIds(
          bullionSiteInfos.map(({ id }) => id),
        );
        expect(result).toHaveLength(bullionSiteInfos.length);
        return expect(result).toStrictEqual(
          expect.arrayContaining(bullionSiteInfos),
        );
      });
    });
  });
});
