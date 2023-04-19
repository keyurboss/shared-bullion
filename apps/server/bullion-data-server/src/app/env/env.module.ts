import { DynamicModule, Global, Module } from "@nestjs/common";
import { AppConfig } from "./App.config";
import { ConfigModule } from "@nestjs/config";
import { defaultValidationSchema } from "./validation.schema";

@Global()
@Module({
  providers: [AppConfig],
  exports: [AppConfig],
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
