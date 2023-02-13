import { Component } from '@angular/core';
import { RateTables2Component } from '@rps/bullion-rate-tables';
import { RateTables1Component } from '@rps/bullion-rate-tables/table1';
import { LiveRateService } from '@rps/buillion-frontend-core/services';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
@Component({
  standalone: true,
  imports: [RateTables1Component ,RateTables2Component],
  selector: 'shared-bullion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: LiveRateService,
      useClass: DemoLiveRateService,
    },
  ],
})
export class AppComponent {
  title = 'component-testing-bed';
}
