import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {
  constructor(private configService: ConfigService) {}
  get port() {
    return this.configService.get('AUTH_PORT');
  }
}
