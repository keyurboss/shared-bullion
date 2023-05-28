import { Test, TestingModule } from '@nestjs/testing';
import { randUuid } from '@ngneat/falso';
import { DeviceId } from '@rps/bullion-interfaces';
import { LoggerFactory, MongoDbService } from '@rps/bullion-server-core';
import { Collection } from 'mongodb';
import {
  GeneralUserFilter,
  GeneralUserRepository,
} from '../interface/general-user-repository.interface';
import { GeneralUserMongoRepository } from './general-user-repository.mongo';

describe(GeneralUserRepository.name, () => {
  // let userId: GeneralUserId;
  // let userIds: GeneralUserId[];
  let collectionMock: Partial<Record<keyof Collection, jest.Mock>>;
  let generalUserRepository: GeneralUserRepository;
  let module: TestingModule;

  beforeEach(async () => {
    // userId = randUuid() as GeneralUserId;
    // userIds = Array(5)
    //   .fill(null)
    //   .map(() => randUuid() as GeneralUserId);
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
      providers: [GeneralUserMongoRepository],
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

    generalUserRepository = module.get(GeneralUserMongoRepository);
  });
  describe(GeneralUserMongoRepository.prototype.find.name, () => {
    describe('With Filters', () => {
      beforeEach(() => {
        generalUserRepository.find();
      });
      it(`calls collection's find without any filter`, () => {
        expect(collectionMock.find).toBeCalledTimes(1);
        expect(collectionMock.find).toBeCalledWith(undefined);
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
});
// describe(KioskMongoRepository.name, () => {
//   let kioskMongoRepository: KioskMongoRepository;
//   let collectionMock: Partial<Record<keyof Collection, jest.Mock>>;
//   let fixtureServiceMock: Partial<Record<keyof FixtureService, jest.Mock>>;

//   beforeEach(async () => {
//     collectionMock = {
//       find: jest.fn().mockReturnValue({
//         toArray: jest.fn().mockReturnValue({ map: jest.fn() }),
//       }),
//       updateOne: jest.fn(),
//       findOne: jest.fn(),
//     };

//     fixtureServiceMock = {
//       seedFixtures: jest.fn(),
//     };
//     const loggerMock = {
//       debug: jest.fn(),
//     };
//     const loggerFactoryMock = {
//       create: jest.fn().mockReturnValue(loggerMock),
//     };
//     module = await Test.createTestingModule({
//       providers: [KioskMongoRepository],
//     })
//       .useMocker((token) => {
//         switch (token) {
//           case MongoDbService:
//             return {
//               db: { collection: jest.fn().mockReturnValue(collectionMock) },
//             };
//           case LoggerFactory:
//             return loggerFactoryMock;
//           case FixtureService:
//             return fixtureServiceMock;
//         }
//         return undefined;
//       })
//       .compile();

//     kioskMongoRepository = module.get(KioskMongoRepository);
//   });

//   afterEach(async () => {
//     await module.close();
//   });
//   it('seeds fixtures into collections', async () => {
//     await module.init();
//     expect(fixtureServiceMock.seedFixtures).toHaveBeenCalledWith(
//       kiosksCollectionName,
//       'kiosks.data.json'
//     );
//   });

//   describe(KioskMongoRepository.prototype.find.name, () => {
//     it('calls collection method', async () => {
//       await kioskMongoRepository.find();
//       expect(collectionMock.find).toHaveBeenCalledWith();
//     });
//   });

//   describe(KioskMongoRepository.prototype.findOne.name, () => {
//     it('calls collection method with payload', async () => {
//       const kioskSerial = faker.random.word() as KioskSerial;
//       await kioskMongoRepository.findOne(kioskSerial);
//       expect(collectionMock.findOne).toHaveBeenCalledWith({
//         serial: kioskSerial.toString(),
//       });
//     });
//   });

//   describe(KioskMongoRepository.prototype.findOne.name, () => {
//     it('calls collection method with payload', async () => {
//       const serial = faker.random.alphaNumeric(5) as KioskSerial;
//       await kioskMongoRepository.findOne(serial);
//       expect(collectionMock.findOne).toHaveBeenCalledWith({
//         serial,
//       });
//     });
//   });
//   describe(KioskMongoRepository.prototype.findBySerials.name, () => {
//     it('calls collection find with filter', async () => {
//       const kioskSerials = [
//         faker.random.word() as KioskSerial,
//         faker.random.word() as KioskSerial,
//       ];
//       await kioskMongoRepository.findBySerials(kioskSerials);

//       expect(collectionMock.find).toHaveBeenCalledWith({
//         serial: { $in: kioskSerials },
//       });
//     });
//   });
//   describe(KioskMongoRepository.prototype.save.name, () => {
//     it('calls collection updateOne with kiosk', async () => {
//       const kiosk = KioskFixtureFactory.create();
//       await kioskMongoRepository.save(kiosk);

//       expect(collectionMock.updateOne).toHaveBeenCalledWith(
//         { serial: kiosk.serial },
//         { $set: kiosk.toJson() },
//         { upsert: true }
//       );
//     });
//   });
// });
