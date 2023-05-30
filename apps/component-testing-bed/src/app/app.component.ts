import { Component } from '@angular/core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
import { LiveRateService } from '@rps/buillion-frontend-core/services';
import { RateTables6Component, RateTables7Component, RateTables10Component, RateTables2Component } from '@rps/bullion-rate-tables';
import { Env } from '@rps/buillion-frontend-core/core';
@Component({
  standalone: true,
  imports: [RateTables7Component, RateTables6Component, RateTables2Component, RateTables10Component],
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
