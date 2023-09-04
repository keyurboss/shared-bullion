import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core';
import { RateBaseSymboles } from '@rps/bullion-interfaces';
import { Observable } from 'rxjs';
export interface table11DataInterface {
  symbole: RateBaseSymboles;
  ProductName: { name: string }[];
}
@Component({
  selector: 'rps-bull-rate-tables-11',
  standalone: true,
  imports: [NgClass, NgFor, AsyncPipe, NgIf, JsonPipe],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-11.component.html',
  styleUrls: ['./rate-tables-11.component.scss'],
})
export class RateTables11Component {
  @Input() Header = '';
  @Input() sell = '';
  @Input()
  public _table: table11DataInterface[] = [];

  public get table(): table11DataInterface[] {
    return this._table;
  }

  public set table(value: table11DataInterface[]) {
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
