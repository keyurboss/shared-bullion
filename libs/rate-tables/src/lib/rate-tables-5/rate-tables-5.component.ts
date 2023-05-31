import {
  AsyncPipe,
  CommonModule,
  JsonPipe,
  NgFor,
  NgIf,
} from '@angular/common';
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core';
import { RateBaseSymboles } from '@rps/bullion-interfaces';
import { Observable } from 'rxjs';
export interface data {
  symbole: RateBaseSymboles;
  productName: string;
}

@Component({
  selector: 'rps-bull-rate-tables-5',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgFor, NgIf, CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-5.component.html',
  styleUrls: ['./rate-tables-5.component.scss'],
})
export class RateTables5Component {
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
