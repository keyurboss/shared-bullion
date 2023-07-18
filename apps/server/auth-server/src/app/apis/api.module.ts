import { Module } from '@nestjs/common';
import { GetDeviceIdController } from './get-device-id/get-device-id.api';

const controllers = [GetDeviceIdController];

@Module({
  controllers: [...controllers],
})
export class APIModule {}
