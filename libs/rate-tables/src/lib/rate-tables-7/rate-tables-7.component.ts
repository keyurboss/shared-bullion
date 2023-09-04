/* eslint-disable camelcase */
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core';
import { RateBaseSymbols } from '@rps/bullion-interfaces';
import { Observable } from 'rxjs';

export interface IRateTable7Data {
  symbole: RateBaseSymbols;
  productname: { name: string }[];
}

@Component({
  selector: 'rps-bull-rate-tables-7',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgFor, NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-7.component.html',
  styleUrls: ['./rate-tables-7.component.scss'],
})
export class RateTables7Component {
  GOLD: Observable<RateObserDataType>;
  // SILVER: Observable<RateObserDataType>;

  // silverData = [
  //   {
  //     name: 'SILVER. BARTCS',
  //   },
  //   {
  //     name: 'Silver Peti RJT TCS',
  //   },
  //   {
  //     name: 'Silver Bar RR TCS',
  //   },
  // ];

  // constructor(@Inject(LiveRateService) alay: LiveRateService) {
  //   this.SILVER = alay.RateObser$.SILVER_SPOT.asObservable();

  @Input() Table_title = {
    Header: '',
    sell: '',
    gold: '',
    buy: '',
  };

  @Input()
  private _table: IRateTable7Data[] = [];

  public get table(): IRateTable7Data[] {
    return this._table;
  }

  public set table(value: IRateTable7Data[]) {
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
  ) {
    this.GOLD = rateObservar.RateObser$.GOLD_SPOT.asObservable();
  }
}
