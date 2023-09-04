import { AsyncPipe, JsonPipe, NgIf, NgFor } from '@angular/common';
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core';
import { RateBaseSymbols } from '@rps/bullion-interfaces';
import { Observable } from 'rxjs';
export interface table6DataInterface {
  symbole: RateBaseSymbols;
  ProductName: string;
}

@Component({
  selector: 'rps-bull-rate-tables-6',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgIf, NgFor],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-6.component.html',
  styleUrls: ['./rate-tables-6.component.scss'],
})
export class RateTables6Component {
  @Input() headers = {
    HeaderName: '',
    bid: '',
    diff: '',
    ask: '',
  };

  @Input()
  private _table: table6DataInterface[] = [];

  public get table(): table6DataInterface[] {
    return this._table;
  }

  public set table(value: table6DataInterface[]) {
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
