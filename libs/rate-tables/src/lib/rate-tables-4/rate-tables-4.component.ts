import { Component, ViewEncapsulation, Inject, Input } from '@angular/core';
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { RateBaseSymboles } from '@rps/bullion-interfaces';
export interface data {
  symbole: RateBaseSymboles
  product_name: string;
}

@Component({
  selector: 'rps-bull-rate-tables-4',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgFor, NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-4.component.html',
  styleUrls: ['./rate-tables-4.component.scss'],
})
export class RateTables4Component {
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
