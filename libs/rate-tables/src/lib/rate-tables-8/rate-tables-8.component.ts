import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core/services';
import { Observable } from 'rxjs';
interface data {
  headerName: string;
  details: {
    Name: string;
  }[];
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
  gold: Observable<RateObserDataType>;
  // silver: Observable<RateObserDataType>;
  rateClass = {
    red: true,
    green: false,
  };

  table: data[] = [
    {
      headerName: 'GOLD PRODUCT',
      details: [
        {
          Name: 'IMP 999 RTGS (TCS)',
        },
        {
          Name: 'LOCAL RTGS (TCS)',
        },
      ],
    },
    {
      headerName: 'SILVER PRODUCT',
      details: [
        {
          Name: 'PETI 30KG RTGS (TCS)',
        },
        {
          Name: 'CHORSA RTGS (TCS)',
        },
      ],
    },
  ];

  constructor(@Inject(LiveRateService) Alay: LiveRateService) {
    this.gold = Alay.RateObser$.GOLD.asObservable();
    this.gold = Alay.RateObser$.SILVER.asObservable();
  }
}
//   {
//     headerName:'SILVER PRODUCT',
//     leftSideName:'PETI 30KG RTGS(TCS)',
//     leftValue:77772,
//     rightSideName:'CHORSA RTGS(TCS)',
//     rightValue:4456521,
//   },
//   {
//     headerName:'SILVER PRODUCT',
//     leftSideName:'PETI 30KG RTGS(TCS)',
//     leftValue:77772,
//     rightSideName:'CHORSA RTGS(TCS)',
//     rightValue:4456521,
//   },
//  ]
