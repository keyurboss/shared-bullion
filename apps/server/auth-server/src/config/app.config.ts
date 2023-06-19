import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {
  constructor(private configService: ConfigService) {
    console.log('Created');
    
  }
  get port() {
    return this.configService.get('AUTH_PORT');
  }

  get refreshTokenKey() {
    return this.configService.get('AUTH_REFRESH_TOKEN_KEY');
  }

  get accessTokenKey() {
    console.log(process.env);
    return this.configService.get('ACCESS_TOKEN_KEY');
  }
}
