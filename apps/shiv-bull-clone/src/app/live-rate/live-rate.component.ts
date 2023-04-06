import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateTables1Component } from '@rps/bullion-rate-tables/table1';
import { RateTables3Component } from '@rps/bullion-rate-tables/table3';
import { RateTables2Component } from '@rps/bullion-rate-tables/table2';
import { RateTables4Component } from '@rps/bullion-rate-tables/table4';
import { RateTables5Component } from '@rps/bullion-rate-tables/table5';
import { RateTables6Component } from '@rps/bullion-rate-tables/table6';
import { LiveRateService } from '@rps/buillion-frontend-core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';

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
export class LiveRateComponent {}
