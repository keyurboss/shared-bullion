import { Controller, Get } from '@nestjs/common';
import { DeviceId } from '@rps/bullion-interfaces';

import { randomBytes } from 'crypto';

@Controller('get')
export class GetDeviceIdController {
  @Get('deviceId')
  getDeviceId(): DeviceId {
    return randomBytes(32).toString('hex') as DeviceId;
  }
}
