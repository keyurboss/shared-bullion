import { AsyncPipe, CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { LiveRateService, RateObserDataType } from '@rps/buillion-frontend-core';
import { Observable } from 'rxjs';

@Component({
  selector: 'rps-bull-rate-tables-9',
  standalone: true,
  imports: [NgFor, AsyncPipe, NgIf, JsonPipe, CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-9.component.html',
  styleUrls: ['./rate-tables-9.component.scss'],
})
export class RateTables9Component {
  rate: Observable<RateObserDataType>;
  @Input() productName = 'GOLD';
  
  constructor(@Inject(LiveRateService) sahil: LiveRateService) {
    this.rate = sahil.RateObser$.GOLD_SPOT.asObservable();
  }
}
