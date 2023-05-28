import { AsyncPipe, CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RateObserDataType } from '@rps/buillion-frontend-core';
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
  @Input() productName = '';
  
  constructor(@Inject(LiveRateService) sahil: LiveRateService) {
    this.rate = sahil.RateObser$.GOLD_SPOT.asObservable();
  }
}
