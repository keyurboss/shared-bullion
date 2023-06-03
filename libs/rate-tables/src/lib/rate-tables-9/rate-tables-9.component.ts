import { AsyncPipe, CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { LiveRateService, RateObserDataType } from '@rps/buillion-frontend-core';
import { RateBaseSymboles } from '@rps/bullion-interfaces';
export interface data {
  symbole: RateBaseSymboles
  productName: string;
}
import { Observable } from 'rxjs';

@Component({
  selector: 'rps-bull-rate-tables-9',
  standalone: true,
  imports: [NgFor, AsyncPipe, NgIf, JsonPipe, CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-9.component.html',
  styleUrls: ['./rate-tables-9.component.scss'],
})
export class RateTables9Component {
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
