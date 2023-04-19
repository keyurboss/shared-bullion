import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { appEnvNameKey,AppEnvName } from '@rps/bullion-interfaces/core';

@Injectable()
export class AppConfig {
  constructor(private configService: ConfigService) {}

  get env(): AppEnvName {
    return this.configService.get(appEnvNameKey);
  }
  get port(): number {
    return this.configService.get('DATA_SERVER_PORT');
  }
}
