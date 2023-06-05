import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { LiveRateService, RateObserDataType } from '@rps/buillion-frontend-core';
import { RateTables8Component } from '@rps/bullion-rate-tables';
import { RateTables1Component } from '@rps/bullion-rate-tables/table1';
import { RateTables2Component } from '@rps/bullion-rate-tables/table2';
import { RateTables3Component } from '@rps/bullion-rate-tables/table3';
import { RateTables4Component } from '@rps/bullion-rate-tables/table4';
import { RateTables5Component } from '@rps/bullion-rate-tables/table5';
import { RateTables6Component } from '@rps/bullion-rate-tables/table6';
import { RateTables9Component } from '@rps/bullion-rate-tables/table9';
import { Observable } from 'rxjs';

@Component({
  selector: 'akshat-bull-app-live-rate',
  standalone: true,
  imports: [CommonModule, RateTables1Component, RateTables2Component, RateTables9Component, RateTables3Component, RateTables8Component, RateTables4Component, RateTables5Component, RateTables6Component],
  templateUrl: './live-rate.component.html',
  styleUrls: ['./live-rate.component.scss'],

})
export class LiveRateComponent {
  Gold_rate: Observable<RateObserDataType>;
  Silver_rate: Observable<RateObserDataType>;
  Inr_rate: Observable<RateObserDataType>;

  constructor(@Inject(LiveRateService) sahil: LiveRateService) {
    this.Gold_rate = sahil.RateObser$.GOLD_SPOT.asObservable();
    this.Silver_rate = sahil.RateObser$.SILVER_SPOT.asObservable();
    this.Inr_rate = sahil.RateObser$.INR.asObservable();
  }

  user() {
    if (navigator.onLine) {
      console.log('online');
    }
    else {
      console.log('offfline');

    }
  }
}
