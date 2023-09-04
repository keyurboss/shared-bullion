import {
  AsyncPipe,
  DecimalPipe,
  JsonPipe,
  NgClass,
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
export interface table8DataInterface {
  headerName: string;
  symbol: RateBaseSymbols;
  details: {
    Name: string;
  }[];
}
@Component({
  selector: 'rps-bull-rate-tables-8',
  standalone: true,
  imports: [NgClass, NgFor, AsyncPipe, NgIf, JsonPipe, DecimalPipe],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-8.component.html',
  styleUrls: ['./rate-tables-8.component.scss'],
})
export class RateTables8Component {
  @Input()
  private _table: table8DataInterface[] = [];

  public get table(): table8DataInterface[] {
    return this._table;
  }

  public set table(value: table8DataInterface[]) {
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
