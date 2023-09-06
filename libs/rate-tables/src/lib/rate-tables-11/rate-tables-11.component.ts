import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  Signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  LiveRateService,
  RateSignalDataType,
} from '@rps/buillion-frontend-core';
import { RateBaseSymbols } from '@rps/bullion-interfaces';
export interface table11DataInterface {
  symbol: RateBaseSymbols;
  ProductName: { name: string }[];
}
@Component({
  selector: 'rps-bull-rate-tables-11',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgFor, AsyncPipe, NgIf, JsonPipe],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-11.component.html',
  styleUrls: ['./rate-tables-11.component.scss'],
})
export class RateTables11Component {
  @Input() Header = '';
  @Input() sell = '';

  public _table: table11DataInterface[] = [];

  @Input()
  public get table(): table11DataInterface[] {
    return this._table;
  }

  public set table(value: table11DataInterface[]) {
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
