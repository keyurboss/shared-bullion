import { DynamicModule, Global, Module } from '@nestjs/common';

import { FixtureService } from './fixture.service';
import { FIXTURES_PATH } from './fixtures-path.token';

@Global()
@Module({})
export class FixturesModule {
  static forRoot(fixturesPath?: string): DynamicModule {
    return {
      module: FixturesModule,
      providers: [
        {
          provide: FIXTURES_PATH,
          useValue: fixturesPath,
        },
        FixtureService,
      ],
      exports: [FixtureService],
    };
  }
}
