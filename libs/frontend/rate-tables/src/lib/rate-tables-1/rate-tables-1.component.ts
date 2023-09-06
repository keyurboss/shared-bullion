import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
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
export interface data {
  symbol: RateBaseSymbols;
  productName: { name: string }[];
}
@Component({
  selector: 'rps-bull-rate-tables-1',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgFor, AsyncPipe, NgIf, JsonPipe],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-1.component.html',
  styleUrls: ['./rate-tables-1.component.scss'],
})
export class RateTables1Component {
  // rate: Observable<RateObserDataType>;
  // rateClass = {
  //   red: true,
  //   green: false,
  // };

  // data = [
  //   {
  //     name: 'GOLD 999 IMP WITH TDS',
  //     value: '58860',
  //   },
  //   {
  //     name: 'GOLD 999 IMP WITH TCS',
  //     value: '58915',
  //   },
  //   {
  //     name: 'GOLD 999 LOCAL WITH TDS',
  //     value: '58790',
  //   },
  //   {
  //     name: 'GOLD 999 LOCAL WITH TCS',
  //     value: '58845',
  //   },
  // ];

  // constructor(@Inject(LiveRateService) Pratham: LiveRateService) {
  //   this.rate = Pratham.RateObser$.GOLD.asObservable();
  // }

  RateObser$: Record<RateBaseSymbols, Signal<RateSignalDataType>> = {} as never;

  @Input() header = '';
  @Input() sell = '';

  private _table: data[] = [];

  @Input()
  public get table(): data[] {
    return this._table;
  }

  public set table(value: data[]) {
    value.forEach(({ symbol }) => {
      this.RateObser$[symbol] = this.rateObservar.RateSignal$[symbol];
    });

    this._table = value;
  }

  constructor(
    @Inject(LiveRateService) private readonly rateObservar: LiveRateService,
  ) {}
}
