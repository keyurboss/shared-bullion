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
  ChangeDetectionStrategy,
  Signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  LiveRateService,
  RateSignalDataType,
} from '@rps/buillion-frontend-core';
import { RateBaseSymbols } from '@rps/bullion-interfaces';
export interface table5DataInterface {
  symbol: RateBaseSymbols;
  productName: string;
}

@Component({
  selector: 'rps-bull-rate-tables-5',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [AsyncPipe, JsonPipe, NgFor, NgIf, CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-5.component.html',
  styleUrls: ['./rate-tables-5.component.scss'],
})
export class RateTables5Component {
  @Input()
  private _table: table5DataInterface[] = [];

  public get table(): table5DataInterface[] {
    return this._table;
  }

  public set table(value: table5DataInterface[]) {
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
