import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { LiveRateService, RateObserDataType } from '@rps/buillion-frontend-core';
import { Observable } from 'rxjs';

@Component({
  selector: 'rps-bull-rate-tables-6',
  standalone: true,
  imports: [AsyncPipe, JsonPipe,NgIf],
  encapsulation:ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-6.component.html',
  styleUrls: ['./rate-tables-6.component.scss'],
})
export class RateTables6Component {
  headers={
    product_name:"FUTURE RATE",
    bid:"BID",
    diff:"DIFF",
    ask:"ASK"
  }
  GOLD:Observable<RateObserDataType>;
  SILVER:Observable<RateObserDataType>;
  constructor(@Inject(LiveRateService) sahil:LiveRateService){
    this.GOLD= sahil.RateObser$.GOLD_MCX.asObservable();
    this.SILVER= sahil.RateObser$.SILVER_MCX.asObservable();
  }
}
