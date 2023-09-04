import { Component } from '@angular/core';

import { Env } from '@rps/buillion-frontend-core/core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
import { LiveRateService } from '@rps/buillion-frontend-core/services';
import { RateBaseSymbols } from '@rps/bullion-interfaces';
import {
  RateTables11Component,
  RateTables2Component,
  RateTables6Component,
  RateTables7Component,
} from '@rps/bullion-rate-tables';
@Component({
  standalone: true,
  imports: [
    RateTables7Component,
    RateTables6Component,
    RateTables11Component,
    RateTables2Component,
  ],
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
  d = [
    {
      symbol: RateBaseSymbols.GOLD,
      productName: 'GOLD',
      BID: 'BID',
      ASK: 'ASK',
      HIGH: 'High',
      LOW: 'Low',
    },
  ];

  title = 'component-testing-bed';
}
