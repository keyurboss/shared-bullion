import { RateTables1Component } from '@rps/bullion-rate-tables/table1';
import { RateTables3Component } from '@rps/bullion-rate-tables/table3';
import { RateTables2Component } from '@rps/bullion-rate-tables/table2';
import { RateTables4Component } from '@rps/bullion-rate-tables/table4';
import { RateTables5Component } from '@rps/bullion-rate-tables/table5';
import { RateTables6Component } from '@rps/bullion-rate-tables/table6';
import { RateTables7Component } from '@rps/bullion-rate-tables/table7';
import { LiveRateService, RateObserDataType } from '@rps/buillion-frontend-core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RateTables10Component,
  RateTables11Component,
  RateTables8Component,
  RateTables9Component,
} from '@rps/bullion-rate-tables';
import { Observable } from 'rxjs';
// import { Inject } from '@nestjs/common';

@Component({
  selector: 'shiv-bull-app-live-rate',
  standalone: true,
  imports: [
    CommonModule,
    RateTables1Component,
    RateTables2Component,
    RateTables3Component,
    RateTables4Component,
    RateTables5Component,
    RateTables6Component,
    RateTables7Component,
    RateTables8Component,
    RateTables9Component,
    RateTables10Component,
    RateTables11Component,
  ],
  providers: [
    {
      provide: LiveRateService,
      useClass: DemoLiveRateService,
    },
  ],
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
}
