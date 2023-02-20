import { Component } from '@angular/core';
import { RateTables1Component } from '@rps/bullion-rate-tables/table1';
import { RateTables4Component } from '@rps/bullion-rate-tables/table4';

import { Env } from '@rps/buillion-frontend-core/core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
import { LiveRateService } from '@rps/buillion-frontend-core/services';
@Component({
  standalone: true,
  imports: [RateTables4Component,RateTables1Component],
  selector: 'shared-bullion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: LiveRateService,
      useClass: DemoLiveRateService,
    },
    {
      provide: Env,
      useValue: {},
    },
  ],
})
export class AppComponent {
  title = 'component-testing-bed';
}
