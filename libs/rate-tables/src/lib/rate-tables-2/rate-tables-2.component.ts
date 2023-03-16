import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Component, ViewEncapsulation,Inject,Input } from '@angular/core';
import { LiveRateService, RateObserDataType } from '@rps/buillion-frontend-core';


@Component({
  selector: 'rps-bull-rate-tables-2',
  standalone: true,
  imports: [NgFor,AsyncPipe,NgIf,JsonPipe],
  encapsulation:ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-2.component.html',
  styleUrls: ['./rate-tables-2.component.scss'],
})
export class RateTables2Component {
  rate:Observable<RateObserDataType>;
  constructor(@Inject(LiveRateService) sahil:LiveRateService){
    this.rate= sahil.RateObser$.GOLD_SPOT.asObservable();
  }
  @Input() product_name = 'GOLD';
  }
