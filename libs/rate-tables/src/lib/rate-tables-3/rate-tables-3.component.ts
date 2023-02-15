import { NgFor, NgIf,AsyncPipe,JsonPipe } from '@angular/common';
import { Component,Inject, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { 
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core';

@Component({
  selector: 'rps-bull-rate-tables-3',
  standalone: true,
  imports: [NgFor,NgIf,AsyncPipe,JsonPipe],
  encapsulation:ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-3.component.html',
  styleUrls: ['./rate-tables-3.component.scss'],
})
export class RateTables3Component {
  rate: Observable<RateObserDataType>;
  constructor(@Inject(LiveRateService) sahil: LiveRateService) {
    this.rate = sahil.RateObser$.GOLD.asObservable();
  }
  data=[
    {
      "name": "GOLD 999 IMP WITH TDS",
    },
    {
      "name": "GOLD 999 IMP WITH TCS",
    },
    {
      "name": "GOLD 999 LOCAL WITH TDS",
    },
    {
      "name": "GOLD 999 LOCAL WITH TCS",
    },
  ]
}
