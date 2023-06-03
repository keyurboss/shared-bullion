import { Component } from '@angular/core';

import { Env } from '@rps/buillion-frontend-core/core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
import { LiveRateService } from '@rps/buillion-frontend-core/services';
import { RateTables1Component, RateTables2Component, RateTables3Component, RateTables4Component, RateTables5Component, RateTables6Component, RateTables7Component, RateTables9Component } from '@rps/bullion-rate-tables';
@Component({
  standalone: true,
  imports: [RateTables1Component, RateTables2Component, RateTables3Component, RateTables4Component, RateTables5Component, RateTables7Component, RateTables6Component, RateTables9Component],
  selector: 'shared-bullion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: LiveRateService,
      useClass: DemoLiveRateService,
    },
    {
      provide: Env,
      useValue: {},
    },
  ],
})
export class AppComponent {
  title = 'component-testing-bed';
}
