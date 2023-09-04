import { Test, TestingModule } from '@nestjs/testing';
import { randUuid } from '@ngneat/falso';
import { BullionId, DeviceId } from '@rps/bullion-interfaces';
import { LoggerFactory, MongoDbService } from '@bs/core';
import {
  BullionSiteInfoFixtureFactory,
  BullionSiteInfoRoot,
} from '@bs/validator-roots';
import { Collection } from 'mongodb';
import {
  BullionSiteInfoFilter,
  BullionSiteInfoRepository,
} from '../../interface';
import { BullionSiteInfoMongoRepository } from './bullion-site-info-repository.mongo';
BullionSiteInfoRoot;

describe(BullionSiteInfoRepository.name, () => {
  let collectionMock: Partial<Record<keyof Collection, jest.Mock>>;
  let bullionSiteInfoRepository: BullionSiteInfoRepository;
  let module: TestingModule;

  beforeEach(async () => {
    collectionMock = {
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockReturnValue({ map: jest.fn() }),
      }),
      updateOne: jest.fn(),
      findOne: jest.fn(),
    };

    const loggerMock = {
      debug: jest.fn(),
    };
    const loggerFactoryMock = {
      create: jest.fn().mockReturnValue(loggerMock),
    };
    module = await Test.createTestingModule({
      providers: [
        {
          provide: BullionSiteInfoRepository,
          useClass: BullionSiteInfoMongoRepository,
        },
      ],
    })
      .useMocker((token) => {
        switch (token) {
          case MongoDbService:
            return {
              db: { collection: jest.fn().mockReturnValue(collectionMock) },
            };
          case LoggerFactory:
            return loggerFactoryMock;
        }
        return undefined;
      })
      .compile();

    bullionSiteInfoRepository = module.get(BullionSiteInfoRepository);
  });
  describe(BullionSiteInfoMongoRepository.prototype.find.name, () => {
    describe('With Filters', () => {
      beforeEach(() => {
        bullionSiteInfoRepository.find();
      });
      it(`calls collection's find without any filter`, () => {
        expect(collectionMock.find).toBeCalledTimes(1);
        expect(collectionMock.find).toHaveBeenCalledWith();
      });
    });
    describe('With out Filters', () => {
      let bullionFilter: BullionSiteInfoFilter;
      beforeEach(() => {
        bullionFilter = {
          deviceId: randUuid() as DeviceId,
        };
        bullionSiteInfoRepository.find(bullionFilter);
      });
      it(`calls collection's find with passed filter`, () => {
        expect(collectionMock.find).toBeCalledTimes(1);
        expect(collectionMock.find).toBeCalledWith(bullionFilter);
      });
    });
  });
  describe(BullionSiteInfoMongoRepository.prototype.findOne.name, () => {
    let bullionId: BullionId;
    beforeEach(() => {
      bullionId = randUuid() as BullionId;
      bullionSiteInfoRepository.findOne(bullionId);
    });
    it(`calls collection's findOne with Id`, () => {
      expect(collectionMock.findOne).toBeCalledTimes(1);
      expect(collectionMock.findOne).toHaveBeenCalledWith({
        id: bullionId,
      });
    });
  });
  describe(BullionSiteInfoMongoRepository.prototype.findByIds.name, () => {
    let bullionIds: Array<BullionId>;
    beforeEach(() => {
      bullionIds = Array(5)
        .fill(null)
        .map(() => randUuid() as BullionId);
      bullionSiteInfoRepository.findByIds(bullionIds);
    });
    it(`calls collection's find with Ids`, () => {
      expect(collectionMock.find).toBeCalledTimes(1);
      expect(collectionMock.find).toHaveBeenCalledWith({
        id: {
          $in: bullionIds,
        },
      });
    });
  });
  describe(BullionSiteInfoMongoRepository.prototype.save.name, () => {
    let entity: BullionSiteInfoRoot;
    beforeEach(() => {
      entity = BullionSiteInfoFixtureFactory.create();
      bullionSiteInfoRepository.save(entity);
    });
    it(`calls collection's updateOne with entity`, () => {
      expect(collectionMock.updateOne).toBeCalledTimes(1);
      expect(collectionMock.updateOne).toHaveBeenCalledWith(
        { id: entity.id },
        { $set: entity.toJson() },
        { upsert: true },
      );
    });
  });
});
