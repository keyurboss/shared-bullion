import { Test, TestingModule } from '@nestjs/testing';
import { randUuid } from '@ngneat/falso';
import { DeviceId, GeneralUserId } from '@rps/bullion-interfaces';
import { LoggerFactory, MongoDbService } from '@bs/core';
import { Collection } from 'mongodb';
import { GeneralUserFilter, GeneralUserRepository } from '../../interface';
import { GeneralUserMongoRepository } from './general-user-repository.mongo';
import {
  GeneralUserFixtureFactory,
  GeneralUserRoot,
} from '@bs/validator-roots';

describe(GeneralUserRepository.name, () => {
  let collectionMock: Partial<Record<keyof Collection, jest.Mock>>;
  let generalUserRepository: GeneralUserRepository;
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
          provide: GeneralUserRepository,
          useClass: GeneralUserMongoRepository,
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

    generalUserRepository = module.get(GeneralUserRepository);
  });
  describe(GeneralUserMongoRepository.prototype.find.name, () => {
    describe('With Filters', () => {
      beforeEach(() => {
        generalUserRepository.find();
      });
      it(`calls collection's find without any filter`, () => {
        expect(collectionMock.find).toBeCalledTimes(1);
        expect(collectionMock.find).toHaveBeenCalledWith();
      });
    });
    describe('With out Filters', () => {
      let userFilter: GeneralUserFilter;
      beforeEach(() => {
        userFilter = {
          deviceId: randUuid() as DeviceId,
        };
        generalUserRepository.find(userFilter);
      });
      it(`calls collection's find with passed filter`, () => {
        expect(collectionMock.find).toBeCalledTimes(1);
        expect(collectionMock.find).toBeCalledWith(userFilter);
      });
    });
  });
  describe(GeneralUserMongoRepository.prototype.findOne.name, () => {
    let userId: GeneralUserId;
    beforeEach(() => {
      userId = randUuid() as GeneralUserId;
      generalUserRepository.findOne(userId);
    });
    it(`calls collection's findOne with Id`, () => {
      expect(collectionMock.findOne).toBeCalledTimes(1);
      expect(collectionMock.findOne).toHaveBeenCalledWith({
        id: userId,
      });
    });
  });
  describe(GeneralUserMongoRepository.prototype.findByIds.name, () => {
    let userIds: Array<GeneralUserId>;
    beforeEach(() => {
      userIds = Array(5)
        .fill(null)
        .map(() => randUuid() as GeneralUserId);
      generalUserRepository.findByIds(userIds);
    });
    it(`calls collection's find with Ids`, () => {
      expect(collectionMock.find).toBeCalledTimes(1);
      expect(collectionMock.find).toHaveBeenCalledWith({
        id: {
          $in: userIds,
        },
      });
    });
  });
  describe(GeneralUserMongoRepository.prototype.save.name, () => {
    let user: GeneralUserRoot;
    beforeEach(() => {
      user = GeneralUserFixtureFactory.create();
      generalUserRepository.save(user);
    });
    it(`calls collection's updateOne with user`, () => {
      expect(collectionMock.updateOne).toBeCalledTimes(1);
      expect(collectionMock.updateOne).toHaveBeenCalledWith(
        { id: user.id },
        { $set: user.toJson() },
        { upsert: true },
      );
    });
  });
});
