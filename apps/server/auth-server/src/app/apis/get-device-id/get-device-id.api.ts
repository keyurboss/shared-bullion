import { Controller, Get } from '@nestjs/common';

import { randomBytes } from 'crypto';

@Controller('get')
export class GetDeviceIdController {
  @Get('deviceId')
  getDeviceId() {
    return randomBytes(32).toString('hex');
  }
}
