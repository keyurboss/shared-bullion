import { Test, TestingModule } from '@nestjs/testing';

import { GeneralUserController } from './general-user.controller';
import { REFRESH_TOKEN_SERVICE } from '../../../config/service.token';
import { randomBytes } from 'crypto';
import { JwtService } from '@rps/bullion-server-core';
import { GeneralUserRepository } from '@rps/buillion-server-repository';

describe(GeneralUserController.name, () => {
  let app: TestingModule;
  const refreshTokenKey = randomBytes(16).toString('hex');
  let refreshTokenService: JwtService;
  let generalUserRepositoryMock: Partial<
    Record<keyof GeneralUserRepository, jest.Mock>
  >;
  // let controller: GeneralUserController;
  beforeAll(async () => {
    generalUserRepositoryMock = {
      findOneOrFail: jest.fn().mockResolvedValue(refreshTokenService),
    };

    app = await Test.createTestingModule({
      controllers: [GeneralUserController],
    })
      .overrideProvider(GeneralUserRepository)
      .useValue(generalUserRepositoryMock)
      .overrideProvider(REFRESH_TOKEN_SERVICE)
      .useValue(new JwtService(refreshTokenKey))
      .compile();

    // controller = app.get(GeneralUserController);
    refreshTokenService = app.get(REFRESH_TOKEN_SERVICE);
  });

  xdescribe(
    GeneralUserController.prototype.GetGeneralUserDetailsByToken.name,
    () => {
      it.todo('should throw an error for Invalid Token Signature');
      it.todo('Throws an error if token has invalid Typename');
      it.todo('calls generalUserRepository findOneOrFail with token id');
      it.todo('return the user details');
      // it('should return 32 char long string', () => {
      //   const appController = app.get<GetDeviceIdController>(
      //     GetDeviceIdController,
      //   );
      //   const id = appController.getDeviceId();
      //   expect(id).toHaveLength(32);
      // });
    },
  );
});
