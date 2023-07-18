import {
  AsyncPipe,
  CommonModule,
  JsonPipe,
  NgFor,
  NgIf,
} from '@angular/common';
import { Observable } from 'rxjs';
import { Component, ViewEncapsulation, Inject, Input } from '@angular/core';
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core';
import { RateBaseSymboles } from '@rps/bullion-interfaces';
export interface table2DataInterface {
  symbole: RateBaseSymboles
  productName: string;
  BID: string;
  ASK: string;
  HIGH: string;
  LOW: string;
}

@Component({
  selector: 'rps-bull-rate-tables-2',
  standalone: true,
  imports: [NgFor, AsyncPipe, NgIf, JsonPipe, CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-2.component.html',
  styleUrls: ['./rate-tables-2.component.scss'],
})
export class RateTables2Component {
  private _table: table2DataInterface[] = [];
  
  @Input()
  public get table(): table2DataInterface[] {
    return this._table;
  }
  
  public set table(value: table2DataInterface[]) {
    value.forEach(({ symbole }) => {
      this.RateObser$[symbole] = this.rateObservar.RateObser$[symbole].asObservable()
    })
    this._table = value;
  }
  
  RateObser$: Record<RateBaseSymboles, Observable<RateObserDataType>> = {} as never
  
  constructor(@Inject(LiveRateService) private readonly rateObservar: LiveRateService) {
  }
}




