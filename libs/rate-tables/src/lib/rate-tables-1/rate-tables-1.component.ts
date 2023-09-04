import { JsonPipe, AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core';
import { RateBaseSymbols } from '@rps/bullion-interfaces';
import { Observable } from 'rxjs';
export interface data {
  symbole: RateBaseSymbols;
  productname: { name: string }[];
}
@Component({
  selector: 'rps-bull-rate-tables-1',
  standalone: true,
  imports: [NgClass, NgFor, AsyncPipe, NgIf, JsonPipe],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-1.component.html',
  styleUrls: ['./rate-tables-1.component.scss'],
})
export class RateTables1Component {
  // rate: Observable<RateObserDataType>;
  // rateClass = {
  //   red: true,
  //   green: false,
  // };

  // data = [
  //   {
  //     name: 'GOLD 999 IMP WITH TDS',
  //     value: '58860',
  //   },
  //   {
  //     name: 'GOLD 999 IMP WITH TCS',
  //     value: '58915',
  //   },
  //   {
  //     name: 'GOLD 999 LOCAL WITH TDS',
  //     value: '58790',
  //   },
  //   {
  //     name: 'GOLD 999 LOCAL WITH TCS',
  //     value: '58845',
  //   },
  // ];

  // constructor(@Inject(LiveRateService) Pratham: LiveRateService) {
  //   this.rate = Pratham.RateObser$.GOLD.asObservable();
  // }
  @Input() header = '';
  @Input() sell = '';
  @Input()
  public _table: data[] = [];

  public get table(): data[] {
    return this._table;
  }

  public set table(value: data[]) {
    value.forEach(({ symbole }) => {
      this.RateObser$[symbole] =
        this.rateObservar.RateObser$[symbole].asObservable();
    });

    this._table = value;
  }

  RateObser$: Record<RateBaseSymbols, Observable<RateObserDataType>> =
    {} as never;

  constructor(
    @Inject(LiveRateService) private readonly rateObservar: LiveRateService,
  ) {}
}
