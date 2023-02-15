import { Component, ViewEncapsulation,Inject } from '@angular/core';
import { LiveRateService, RateObserDataType } from '@rps/buillion-frontend-core';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'rps-bull-rate-tables-5',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgFor, NgIf],
  encapsulation:ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-5.component.html',
  styleUrls: ['./rate-tables-5.component.scss'],
})
export class RateTables5Component {
  GOLD:Observable<RateObserDataType>;
  SILVER:Observable<RateObserDataType>;
  INR:Observable<RateObserDataType>;
  constructor(@Inject(LiveRateService) sahil:LiveRateService){
    this.GOLD= sahil.RateObser$.GOLD_SPOT.asObservable();
    this.SILVER= sahil.RateObser$.SILVER_SPOT.asObservable();
    this.INR= sahil.RateObser$.INR.asObservable();
  }
}
