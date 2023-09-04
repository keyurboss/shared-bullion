import {
  AsyncPipe,
  CommonModule,
  JsonPipe,
  NgFor,
  NgIf,
} from '@angular/common';
import {
  Component,
  Inject,
  Input,
  Signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core';
import { RateBaseSymbols } from '@rps/bullion-interfaces';
export interface table4DataInterface {
  symbol: RateBaseSymbols;
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
      symbol: RateBaseSymbols.GOLD,
      productName: 'GOLD PRODUCTS',
    },
    {
      symbol: RateBaseSymbols.SILVER,
      productName: 'SILVER PRODUCTS',
    },
  ];

  @Input()
  public get table(): table4DataInterface[] {
    return this._table;
  }

  public set table(value: table4DataInterface[]) {
    value.forEach(({ symbol }) => {
      this.RateObser$[symbol] = this.rateObservar.RateObser$[symbol];
    });
    this._table = value;
  }

  RateObser$: Record<RateBaseSymbols, Signal<RateObserDataType>> = {} as never;

  constructor(
    @Inject(LiveRateService) private readonly rateObservar: LiveRateService,
  ) {}
}
