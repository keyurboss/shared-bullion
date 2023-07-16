import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core';
import { RateBaseSymboles } from '@rps/bullion-interfaces';
import { Observable } from 'rxjs';
export interface table3DataInterface {
  symbole: RateBaseSymboles;
  productname: { name: string }[];
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
  @Input() Header = '';
  @Input() sell = '';

  @Input()
  private _table: table3DataInterface[] = [];

  public get table(): table3DataInterface[] {
    return this._table;
  }

  public set table(value: table3DataInterface[]) {
    value.forEach(({ symbole }) => {
      this.RateObser$[symbole] =
        this.rateObservar.RateObser$[symbole].asObservable();
    });
    this._table = value;
  }

  RateObser$: Record<RateBaseSymboles, Observable<RateObserDataType>> =
    {} as never;

  constructor(
    @Inject(LiveRateService) private readonly rateObservar: LiveRateService,
  ) {}
}
