import {JsonPipe, AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { 
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core/services/live-rate.service';
import { Observable } from 'rxjs';
 interface data{
  headerName:string;
  leftSideName:string;
  leftValue:number;
  rightSideName:string;
  rightValue:number;
 }
@Component({
  selector: 'rps-bull-rate-tables-8',
  standalone: true,
  imports: [NgClass, NgFor, AsyncPipe, NgIf, JsonPipe],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-8.component.html',
  styleUrls: ['./rate-tables-8.component.scss'],
})
export class RateTables8Component {
  rate: Observable<RateObserDataType>;
  constructor(@Inject(LiveRateService) Pratham: LiveRateService) {
    this.rate = Pratham.RateObser$.GOLD.asObservable();
  }
  rate_class = {
    red: true,
    green: false,
  };
 table : data[]=[
  {
    headerName:'GOLD PRODUCT',
    leftSideName:'IMP 999 RTGS(TCS)',
    leftValue:74,
    rightSideName:'LOCAL RTGS(TCS)',
    rightValue:44,
  },
  {
    headerName:'SILVER PRODUCT',
    leftSideName:'PETI 30KG RTGS(TCS)',
    leftValue:77772,
    rightSideName:'CHORSA RTGS(TCS)',
    rightValue:4456521,
  },
 ]
}
