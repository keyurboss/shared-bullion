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
export interface table4DataInterface {
  symbole: RateBaseSymboles;
  productName: string;
}

@Component({
  selector: 'rps-bull-rate-tables-4',
  standalone: true,
  imports: [AsyncPipe, CommonModule, JsonPipe, NgFor, NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-4.component.html',
  styleUrls: ['./rate-tables-4.component.scss'],
})
export class RateTables4Component {
  private _table: table4DataInterface[] = [
    {
      symbole: RateBaseSymboles.GOLD,
      productName: 'GOLD PRODUCTS',
    },
    {
      symbole: RateBaseSymboles.SILVER,
      productName: 'SILVER PRODUCTS',
    },
  ];

  @Input()
  public get table(): table4DataInterface[] {
    return this._table;
  }

  public set table(value: table4DataInterface[]) {
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
  ) {}
}
