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
<<<<<<< HEAD
import { AsyncPipe, CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
=======
export interface table4DataInterface {
  symbole: RateBaseSymboles;
  productName: string;
}
>>>>>>> 473e86c1f7bd1e0fb586702c34c5b687cc3b4c06

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

<<<<<<< HEAD
  constructor(@Inject(LiveRateService) pr: LiveRateService) {
    this.GOLD = pr.RateObser$.GOLD.asObservable();
    this.SILVER = pr.RateObser$.SILVER.asObservable();
=======
  @Input()
  public get table(): table4DataInterface[] {
    return this._table;
>>>>>>> 473e86c1f7bd1e0fb586702c34c5b687cc3b4c06
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
