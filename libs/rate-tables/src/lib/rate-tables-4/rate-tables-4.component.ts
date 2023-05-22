import { Component, ViewEncapsulation, Inject } from '@angular/core';
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'rps-bull-rate-tables-4',
  standalone: true,
  imports: [AsyncPipe, CommonModule, JsonPipe, NgFor, NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-4.component.html',
  styleUrls: ['./rate-tables-4.component.scss'],
})
export class RateTables4Component {
  GOLD: Observable<RateObserDataType>;
  SILVER: Observable<RateObserDataType>;

  constructor(@Inject(LiveRateService) pr: LiveRateService) {
    this.GOLD = pr.RateObser$.GOLD.asObservable();
    this.SILVER = pr.RateObser$.SILVER.asObservable();
  }
}
