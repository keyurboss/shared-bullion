import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  Signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import {
  LiveRateService,
  RateSignalDataType,
} from '@rps/buillion-frontend-core';
import { RateBaseSymbols } from '@rps/bullion-interfaces';
export interface table6DataInterface {
  symbol: RateBaseSymbols;
  ProductName: string;
}

@Component({
  selector: 'rps-bull-rate-tables-6',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

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
    value.forEach(({ symbol }) => {
      this.RateObser$[symbol] = this.rateObservar.RateSignal$[symbol];
    });
    this._table = value;
  }

  RateObser$: Record<RateBaseSymbols, Signal<RateSignalDataType>> = {} as never;

  constructor(
    @Inject(LiveRateService) private readonly rateObservar: LiveRateService,
  ) {}
}
