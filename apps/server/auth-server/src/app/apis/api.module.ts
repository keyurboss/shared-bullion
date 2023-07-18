import { Module } from '@nestjs/common';
import { GeneralUserController } from './general-user/general-user.controller';
import { GetDeviceIdController } from './get-device-id/get-device-id.api';

const controllers = [GetDeviceIdController, GeneralUserController];

@Module({
  controllers: [...controllers],
})
export class APIModule {}
