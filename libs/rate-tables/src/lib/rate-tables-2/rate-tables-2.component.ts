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
export interface table2DataInterface {
  symbol: RateBaseSymbols;
  productName: string;
  BID: string;
  ASK: string;
  HIGH: string;
  LOW: string;
}

@Component({
  selector: 'rps-bull-rate-tables-2',
  standalone: true,
  imports: [NgFor, AsyncPipe, NgIf, JsonPipe, CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-2.component.html',
  styleUrls: ['./rate-tables-2.component.scss'],
})
export class RateTables2Component {
  private _table: table2DataInterface[] = [];

  @Input()
  public get table(): table2DataInterface[] {
    return this._table;
  }

  public set table(value: table2DataInterface[]) {
    value.forEach(({ symbol: symbole }) => {
      this.RateObser$[symbole] = this.rateObservar.RateObser$[symbole];
    });
    this._table = value;
  }

  RateObser$: Record<RateBaseSymbols, Signal<RateObserDataType>> = {} as never;

  constructor(
    @Inject(LiveRateService) private readonly rateObservar: LiveRateService,
  ) {}
}
