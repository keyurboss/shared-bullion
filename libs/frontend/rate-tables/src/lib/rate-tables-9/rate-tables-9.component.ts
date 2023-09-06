import {
  AsyncPipe,
  CommonModule,
  JsonPipe,
  NgFor,
  NgIf,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  Signal,
  ViewEncapsulation,
} from '@angular/core';
import { LiveRateService, RateSignalDataType } from '@bf/services';
import { RateBaseSymbols } from '@rps/bullion-interfaces';

export interface table9dataInrterface {
  symbol: RateBaseSymbols;
  productName: string;
}
@Component({
  selector: 'rps-bull-rate-tables-9',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, AsyncPipe, NgIf, JsonPipe, CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-9.component.html',
  styleUrls: ['./rate-tables-9.component.scss'],
})
export class RateTables9Component {
  @Input()
  private _table: table9dataInrterface[] = [];

  public get table(): table9dataInrterface[] {
    return this._table;
  }

  public set table(value: table9dataInrterface[]) {
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
