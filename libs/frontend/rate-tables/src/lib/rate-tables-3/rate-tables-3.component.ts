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
export interface table3DataInterface {
  symbol: RateBaseSymbols;
  productname: { name: string }[];
}

@Component({
  selector: 'rps-bull-rate-tables-3',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [NgFor, NgIf, AsyncPipe, JsonPipe],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-3.component.html',
  styleUrls: ['./rate-tables-3.component.scss'],
})
export class RateTables3Component {
  @Input() Header = '';
  @Input() sell = '';

  @Input()
  private _table: table3DataInterface[] = [];

  public get table(): table3DataInterface[] {
    return this._table;
  }

  public set table(value: table3DataInterface[]) {
    value.forEach(({ symbol: symbole }) => {
      this.RateObser$[symbole] = this.rateObservar.RateSignal$[symbole];
    });
    this._table = value;
  }

  RateObser$: Record<RateBaseSymbols, Signal<RateSignalDataType>> = {} as never;

  constructor(
    @Inject(LiveRateService) private readonly rateObservar: LiveRateService,
  ) {}
}
