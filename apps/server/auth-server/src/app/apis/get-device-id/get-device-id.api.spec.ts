import { Test, TestingModule } from '@nestjs/testing';

import { GetDeviceIdController } from './get-device-id.api';

describe(GetDeviceIdController.name, () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [GetDeviceIdController],
    }).compile();
  });

  describe(GetDeviceIdController.prototype.getDeviceId.name, () => {
    it('should return 32 char long string', () => {
      const appController = app.get<GetDeviceIdController>(
        GetDeviceIdController,
      );
      const id = appController.getDeviceId();
      expect(id).toBe(String);
      expect(id).toHaveLength(32);
    });
  });
});
