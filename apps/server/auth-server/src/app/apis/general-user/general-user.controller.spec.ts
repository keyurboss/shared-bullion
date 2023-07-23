import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@rps/bullion-server-core';
import { randomBytes } from 'crypto';
import { REFRESH_TOKEN_SERVICE } from '../../../config/service.token';
import { GeneralUserInteractor } from '../../interactor/general-user/general-user.interactor';
import { GeneralUserController } from './general-user.controller';

describe(GeneralUserController.name, () => {
  let app: TestingModule;
  const refreshTokenKey = randomBytes(16).toString('hex');
  let refreshTokenService: JwtService;
  let generalUserInteractorMock: Partial<
    Record<keyof GeneralUserInteractor, jest.Mock>
  >;
  let controller: GeneralUserController;
  beforeAll(async () => {
    generalUserInteractorMock = {
      findGeneralUserByid: jest.fn().mockResolvedValue(refreshTokenService),
    };

    app = await Test.createTestingModule({
      controllers: [GeneralUserController],
      providers: [
        {
          provide: GeneralUserInteractor,
          useValue: generalUserInteractorMock,
        },
        {
          provide: REFRESH_TOKEN_SERVICE,
          useValue: new JwtService(refreshTokenKey),
        },
      ],
    }).compile();

    controller = app.get(GeneralUserController);
    refreshTokenService = app.get(REFRESH_TOKEN_SERVICE);
  });

  it('Should create controller', () => {
    expect(controller).toBeDefined();
  });

  describe(
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
