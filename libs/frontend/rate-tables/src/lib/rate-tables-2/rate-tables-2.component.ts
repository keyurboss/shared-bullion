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
  ChangeDetectionStrategy,
} from '@angular/core';
import { LiveRateService, RateSignalDataType } from '@bf/services';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    value.forEach(({ symbol: symbol }) => {
      this.RateObser$[symbol] = this.rateObservar.RateSignal$[symbol];
    });
    this._table = value;
  }

  RateObser$: Record<RateBaseSymbols, Signal<RateSignalDataType>> = {} as never;

  constructor(
    @Inject(LiveRateService) private readonly rateObservar: LiveRateService,
  ) {}
}
