import { NgFor, NgIf, AsyncPipe, JsonPipe } from '@angular/common';
import { Component, Inject, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core';
import { RateBaseSymboles } from '@rps/bullion-interfaces';
export interface data {
  symbole: RateBaseSymboles
  Header: string;
  sell: string;
  productname: { name: string }[]
}

@Component({
  selector: 'rps-bull-rate-tables-3',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, JsonPipe],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-3.component.html',
  styleUrls: ['./rate-tables-3.component.scss'],
})
export class RateTables3Component {
  @Input()
  private _table: data[] = [];
  public get table(): data[] {
    return this._table;
  }
  public set table(value: data[]) {
    value.forEach(({ symbole }) => {
      this.RateObser$[symbole] = this.rateObservar.RateObser$[symbole].asObservable()
    })
    this._table = value;
  }
  RateObser$: Record<RateBaseSymboles, Observable<RateObserDataType>> = {} as never
  constructor(@Inject(LiveRateService) private readonly rateObservar: LiveRateService) {
  }
}
