import { AsyncPipe, CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
<<<<<<< HEAD
<<<<<<< HEAD
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RateObserDataType } from '@rps/buillion-frontend-core';
=======
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { LiveRateService, RateObserDataType } from '@rps/buillion-frontend-core';
import { RateBaseSymboles } from '@rps/bullion-interfaces';
>>>>>>> 473e86c1f7bd1e0fb586702c34c5b687cc3b4c06
=======
import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { LiveRateService, RateObserDataType } from '@rps/buillion-frontend-core';
>>>>>>> ba1010496b7d12dce8dfbb6cee42e1fe07362718
import { Observable } from 'rxjs';

export interface table9dataInrterface {
  symbole: RateBaseSymboles
  productName: string;
}
@Component({
  selector: 'rps-bull-rate-tables-9',
  standalone: true,
  imports: [NgFor, AsyncPipe, NgIf, JsonPipe, CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-9.component.html',
  styleUrls: ['./rate-tables-9.component.scss'],
})
export class RateTables9Component {
<<<<<<< HEAD
<<<<<<< HEAD
  @Input() rate!: Observable<RateObserDataType>;
  @Input() product_name = '';
=======
  @Input()
  private _table: table9dataInrterface[] = [];

  public get table(): table9dataInrterface[] {
    return this._table;
  }
  
  public set table(value: table9dataInrterface[]) {
    value.forEach(({ symbole }) => {
      this.RateObser$[symbole] = this.rateObservar.RateObser$[symbole].asObservable()
    })
    this._table = value;
  }
  
  RateObser$: Record<RateBaseSymboles, Observable<RateObserDataType>> = {} as never
  
  constructor(@Inject(LiveRateService) private readonly rateObservar: LiveRateService) {
  }
>>>>>>> 473e86c1f7bd1e0fb586702c34c5b687cc3b4c06
=======
  @Input() rate: Observable<RateObserDataType>;
  @Input() productName = '';
  
  constructor(@Inject(LiveRateService) sahil: LiveRateService) {
    this.rate = sahil.RateObser$.GOLD_SPOT.asObservable();
  }
>>>>>>> ba1010496b7d12dce8dfbb6cee42e1fe07362718
}
