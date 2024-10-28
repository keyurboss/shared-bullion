import {
  ArgumentsHost,
  Catch,
  DynamicModule,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Module,
  NestModule,
  Provider,
} from '@nestjs/common';

import { LoggerModule } from '@bs/core';
import { AppEnvName } from '@rps/bullion-interfaces/core';
import Joi from 'joi';
import { EnvConfigModule } from '../config/env.config.module';
import { defaultValidationSchema } from '../config/validation.schema';
import { TokenModule } from '../core/token.module';
import { APIModule } from './apis/api.module';
import { InterActorModule } from './interactor/interactor.module';
import { RepositoryModule } from './repo/repo.module';

export type AuthServerAppModuleOptions = {
  appEnv: AppEnvName;
};

const services: Provider[] = [];

@Module({
  imports: [
    LoggerModule,
    RepositoryModule,
    APIModule,
    InterActorModule,
    TokenModule,
  ],
  providers: [...services],
})
export class AuthServerAppModule implements NestModule {
  static register({ appEnv }: AuthServerAppModuleOptions): DynamicModule {
    let imports: DynamicModule['imports'] = [
      RepositoryModule.register({ appEnv }),
    ];
    switch (appEnv) {
      case 'ci':
      case 'local':
        imports = [...imports, EnvConfigModule.forRoot()];
        break;
      case 'production':
        imports = [
          ...imports,
          EnvConfigModule.forRoot({
            validationSchema: {
              ...defaultValidationSchema,
              AUTH_DB_URL: Joi.string().uri().required(),
              AUTH_REDIS_URL: Joi.string().uri().required(),
            },
          }),
        ];
        break;
    }

    return {
      module: AuthServerAppModule,
      imports,
    };
  }

  // TODO: Complete MiddleWare
  configure() {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
    // consumer
    //   .apply(AuthMiddleware)
    //   .exclude('/graphql', '/health', '/build-info')
    //   .forRoutes('*');
  }
}

import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseBody: unknown = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      responseBody = exception.getResponse();
    }
    response.status(status).json(responseBody);
    // exception instanceof HttpException
    // ? exception.getStatus()
    // debugger;
    // response.status(status).json();
  }
}
