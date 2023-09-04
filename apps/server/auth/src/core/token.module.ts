import { Global, Module, Provider } from '@nestjs/common';

import { AppEnvName } from '@rps/bullion-interfaces/core';
import { JwtService } from '@rps/bullion-server-core';
import { AppConfig } from '../config/app.config';
import {
  ACCESS_TOKEN_SERVICE,
  REFRESH_TOKEN_SERVICE,
} from '../config/service.token';

export type AuthServerAppModuleOptions = {
  appEnv: AppEnvName;
};

const services: Provider[] = [
  {
    provide: ACCESS_TOKEN_SERVICE,
    useFactory: (config: AppConfig) => {
      return new JwtService(config.accessTokenKey);
    },
    inject: [AppConfig],
  },
  {
    provide: REFRESH_TOKEN_SERVICE,
    useFactory: (config: AppConfig) => {
      return new JwtService(config.refreshTokenKey);
    },
    inject: [AppConfig],
  },
];

@Global()
@Module({
  providers: [...services],
  exports: [...services],
})
export class TokenModule {}
