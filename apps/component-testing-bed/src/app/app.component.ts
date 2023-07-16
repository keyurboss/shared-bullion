import { Component } from '@angular/core';

import { Env } from '@rps/buillion-frontend-core/core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
import { LiveRateService } from '@rps/buillion-frontend-core/services';
import {
  RateTables10Component,
  RateTables5Component,
  RateTables6Component,
} from '@rps/bullion-rate-tables';
@Component({
  standalone: true,
  imports: [RateTables5Component, RateTables6Component, RateTables10Component],
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
