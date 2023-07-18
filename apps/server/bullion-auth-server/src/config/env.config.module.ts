import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfig } from './app.config';
import { DatabaseConfig } from './database.config';
import { defaultValidationSchema } from './validation.schema';

@Global()
@Module({
  providers: [AppConfig, DatabaseConfig],
  exports: [AppConfig, DatabaseConfig],
})
export class EnvConfigModule {
  static forRoot(validationSchema?: unknown): DynamicModule {
    return {
      module: EnvConfigModule,
      imports: [
        ConfigModule.forRoot({
          validationSchema: validationSchema ?? defaultValidationSchema,
          isGlobal: true,
        }),
      ],
    };
  }
}
