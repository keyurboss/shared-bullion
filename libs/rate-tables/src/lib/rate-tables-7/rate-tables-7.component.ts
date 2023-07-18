/* eslint-disable camelcase */
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core';
import { RateBaseSymboles } from '@rps/bullion-interfaces';
import { Observable } from 'rxjs';

export interface data {
  symbole: RateBaseSymboles;
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
  private _table: data[] = [];

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

  RateObser$: Record<RateBaseSymboles, Observable<RateObserDataType>> =
    {} as never;

  constructor(
    @Inject(LiveRateService) private readonly rateObservar: LiveRateService
  ) {
    this.GOLD = rateObservar.RateObser$.GOLD_SPOT.asObservable();
  }
}
