import { Component } from '@angular/core';
import { Env } from '@rps/buillion-frontend-core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
import { LiveRateService } from '@rps/buillion-frontend-core/services';
import { RateTables1Component } from '@rps/bullion-rate-tables/table1';
import { RateTables6Component } from '@rps/bullion-rate-tables/table6';

@Component({
  standalone: true,
  imports: [RateTables1Component,RateTables6Component],
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
