<<<<<<< HEAD
<<<<<<< HEAD
import { JsonPipe, AsyncPipe, NgClass, NgFor, NgIf, CommonModule } from '@angular/common';
=======
import { AsyncPipe, CommonModule, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
>>>>>>> ba1010496b7d12dce8dfbb6cee42e1fe07362718
import { Component, Inject, ViewEncapsulation } from '@angular/core';
=======
import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
>>>>>>> 473e86c1f7bd1e0fb586702c34c5b687cc3b4c06
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core';
<<<<<<< HEAD
import { RateBaseSymboles } from '@rps/bullion-interfaces';
=======
>>>>>>> ba1010496b7d12dce8dfbb6cee42e1fe07362718
import { Observable } from 'rxjs';
<<<<<<< HEAD
interface data {
  headerName: string;
  details: {

    Name: string;
  }[]
<<<<<<< HEAD
=======
export interface table8DataInterface {
  headerName: string;
  symbole: RateBaseSymboles;
  details: {
    Name: string;
  }[];
>>>>>>> 473e86c1f7bd1e0fb586702c34c5b687cc3b4c06
=======
>>>>>>> ba1010496b7d12dce8dfbb6cee42e1fe07362718
}
@Component({
  selector: 'rps-bull-rate-tables-8',
  standalone: true,
  imports: [NgClass, NgFor, AsyncPipe, NgIf, JsonPipe, CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-8.component.html',
  styleUrls: ['./rate-tables-8.component.scss'],
})
export class RateTables8Component {
  @Input()
  private _table: table8DataInterface[] = [];

  public get table(): table8DataInterface[] {
    return this._table;
  }
<<<<<<< HEAD
<<<<<<< HEAD
  rate_class = {
    red: true,
    green: false,
  };
  table: data[] = [
    {
      headerName: 'GOLD PRODUCT',
      details: [{

        Name: 'IMP 999 RTGS (TCS)',
      }, {

        Name: 'LOCAL RTGS (TCS)',
      },
      ]
    },
    {
      headerName: 'SILVER PRODUCT',
      details: [{

        Name: 'PETI 30KG RTGS (TCS)',
      }, {

        Name: 'CHORSA RTGS (TCS)',
      }]
    },



  ]
=======

  public set table(value: table8DataInterface[]) {
    value.forEach(({ symbole }) => {
      this.RateObser$[symbole] =
        this.rateObservar.RateObser$[symbole].asObservable();
    });
    this._table = value;
  }

  RateObser$: Record<RateBaseSymboles, Observable<RateObserDataType>> =
    {} as never;

  constructor(
    @Inject(LiveRateService) private readonly rateObservar: LiveRateService
  ) {}
>>>>>>> 473e86c1f7bd1e0fb586702c34c5b687cc3b4c06
=======
>>>>>>> ba1010496b7d12dce8dfbb6cee42e1fe07362718
}
