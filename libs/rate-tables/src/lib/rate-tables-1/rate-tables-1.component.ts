import { JsonPipe, AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core';
import { Observable } from 'rxjs';

@Component({
  selector: 'rps-bull-rate-tables-1',
  standalone: true,
  imports: [NgClass, NgFor, AsyncPipe, NgIf, JsonPipe],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-1.component.html',
  styleUrls: ['./rate-tables-1.component.scss'],
})
export class RateTables1Component {
  rate: Observable<RateObserDataType>;
  rateClass = {
    red: true,
    green: false,
  };

  data = [
    {
      name: 'GOLD 999 IMP WITH TDS',
      value: '58860',
    },
    {
      name: 'GOLD 999 IMP WITH TCS',
      value: '58915',
    },
    {
      name: 'GOLD 999 LOCAL WITH TDS',
      value: '58790',
    },
    {
      name: 'GOLD 999 LOCAL WITH TCS',
      value: '58845',
    },
  ];

  constructor(@Inject(LiveRateService) Pratham: LiveRateService) {
    this.rate = Pratham.RateObser$.GOLD.asObservable();
  }
}
