import { LoggerFactory, MongoDbService } from '@bs/core';
import { AdminFixtureFactory, AdminRoot } from '@bs/validator-roots';
import { Test, TestingModule } from '@nestjs/testing';
import { randUuid } from '@ngneat/falso';
import { AdminId, DeviceId } from '@rps/bullion-interfaces';
import { Collection } from 'mongodb';
import { AdminFilter, AdminsRepository } from '../../interface';
import { AdminsMongoRepository } from './admin-repository.mongo';

describe(AdminsRepository.name, () => {
  let collectionMock: Partial<Record<keyof Collection, jest.Mock>>;
  let adminRepository: AdminsRepository;
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
          provide: AdminsRepository,
          useClass: AdminsMongoRepository,
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

    adminRepository = module.get(AdminsRepository);
  });
  describe(AdminsMongoRepository.prototype.find.name, () => {
    describe('With Filters', () => {
      beforeEach(() => {
        adminRepository.find();
      });
      it(`calls collection's find without any filter`, () => {
        expect(collectionMock.find).toBeCalledTimes(1);
        expect(collectionMock.find).toHaveBeenCalledWith();
      });
    });
    describe('With out Filters', () => {
      let filter: AdminFilter;
      beforeEach(() => {
        filter = {
          deviceId: randUuid() as DeviceId,
        };
        adminRepository.find(filter);
      });
      it(`calls collection's find with passed filter`, () => {
        expect(collectionMock.find).toBeCalledTimes(1);
        expect(collectionMock.find).toBeCalledWith(filter);
      });
    });
  });
  describe(AdminsMongoRepository.prototype.findOne.name, () => {
    let id: AdminId;
    beforeEach(() => {
      id = randUuid() as AdminId;
      adminRepository.findOne(id);
    });
    it(`calls collection's findOne with Id`, () => {
      expect(collectionMock.findOne).toBeCalledTimes(1);
      expect(collectionMock.findOne).toHaveBeenCalledWith({
        id,
      });
    });
  });
  describe(AdminsMongoRepository.prototype.findByIds.name, () => {
    let ids: Array<AdminId>;
    beforeEach(() => {
      ids = Array(5)
        .fill(null)
        .map(() => randUuid() as AdminId);
      adminRepository.findByIds(ids);
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
  describe(AdminsMongoRepository.prototype.save.name, () => {
    let entity: AdminRoot;
    beforeEach(() => {
      entity = AdminFixtureFactory.create();
      adminRepository.save(entity);
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
