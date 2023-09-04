import { Test, TestingModule } from '@nestjs/testing';
import { randUuid } from '@ngneat/falso';
import {
  DeviceId,
  GeneralUserId,
  GeneralUserReqId,
} from '@rps/bullion-interfaces';
import { LoggerFactory, MongoDbService } from '@bs/core';
import {
  GeneralUserReqFixtureFactory,
  GeneralUserReqRoot,
} from '@rps/bullion-validator-roots';
import { Collection } from 'mongodb';
import {
  GeneralUserReqFilter,
  GeneralUserReqRepository,
} from '../../../interface';
import { GeneralUserReqMongoRepository } from './general-user-repository.mongo';

describe(GeneralUserReqRepository.name, () => {
  let collectionMock: Partial<Record<keyof Collection, jest.Mock>>;
  let generalUserReqRepository: GeneralUserReqRepository;
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
          provide: GeneralUserReqRepository,
          useClass: GeneralUserReqMongoRepository,
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

    generalUserReqRepository = module.get(GeneralUserReqRepository);
  });
  describe(GeneralUserReqMongoRepository.prototype.find.name, () => {
    describe('With Filters', () => {
      beforeEach(() => {
        generalUserReqRepository.find();
      });
      it(`calls collection's find without any filter`, () => {
        expect(collectionMock.find).toBeCalledTimes(1);
        expect(collectionMock.find).toHaveBeenCalledWith();
      });
    });
    describe('With out Filters', () => {
      let userFilter: GeneralUserReqFilter;
      beforeEach(() => {
        userFilter = {
          deviceId: randUuid() as DeviceId,
        };
        generalUserReqRepository.find(userFilter);
      });
      it(`calls collection's find with passed filter`, () => {
        expect(collectionMock.find).toBeCalledTimes(1);
        expect(collectionMock.find).toBeCalledWith(userFilter);
      });
    });
  });
  describe(GeneralUserReqMongoRepository.prototype.findOne.name, () => {
    let id: GeneralUserReqId;
    beforeEach(() => {
      id = randUuid() as GeneralUserReqId;
      generalUserReqRepository.findOne(id);
    });
    it(`calls collection's findOne with Id`, () => {
      expect(collectionMock.findOne).toBeCalledTimes(1);
      expect(collectionMock.findOne).toHaveBeenCalledWith({
        id,
      });
    });
  });
  describe(GeneralUserReqMongoRepository.prototype.findByIds.name, () => {
    let ids: Array<GeneralUserReqId>;
    beforeEach(() => {
      ids = Array(5)
        .fill(null)
        .map(() => randUuid() as GeneralUserReqId);
      generalUserReqRepository.findByIds(ids);
    });
    it(`calls collection's find with Ids`, () => {
      expect(collectionMock.find).toBeCalledTimes(1);
      expect(collectionMock.find).toHaveBeenCalledWith({
        id: {
          $in: ids,
        },
      });
    });
  });
  describe(
    GeneralUserReqMongoRepository.prototype.findOneByGeneralUserId.name,
    () => {
      let id: GeneralUserId;
      beforeEach(() => {
        id = randUuid() as GeneralUserId;
        generalUserReqRepository.findOneByGeneralUserId(id);
      });
      it(`calls collection's findOne with id`, () => {
        expect(collectionMock.findOne).toBeCalledTimes(1);
        expect(collectionMock.findOne).toHaveBeenCalledWith({
          generalUserId: id,
        });
      });
    },
  );
  describe(GeneralUserReqMongoRepository.prototype.save.name, () => {
    let user: GeneralUserReqRoot;
    beforeEach(() => {
      user = GeneralUserReqFixtureFactory.create();
      generalUserReqRepository.save(user);
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
