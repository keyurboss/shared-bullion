import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'rps-bull-rate-tables-7',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgFor, NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-7.component.html',
  styleUrls: ['./rate-tables-7.component.scss'],
})
export class RateTables7Component {
  GOLD: Observable<RateObserDataType>;
  SILVER: Observable<RateObserDataType>;

  constructor(@Inject(LiveRateService) alay: LiveRateService) {
    this.GOLD = alay.RateObser$.GOLD_SPOT.asObservable();
    this.SILVER = alay.RateObser$.SILVER_SPOT.asObservable();
  }
  silver_data=[
      {
        name: "SILVER. BAR 99 TCS",
      },
      {
        name: "Silver Peti RJT TCS",
      },
      {
        name: "Silver Bar RR TCS",
      },
    ]
 

  }
