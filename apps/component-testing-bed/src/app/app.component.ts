import { Component } from '@angular/core';
import { RateTables1Component } from '@rps/bullion-rate-tables/table1';
import { LiveRateService } from '@rps/buillion-frontend-core/services';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
import { Env } from '@rps/buillion-frontend-core/core';

@Component({
  standalone: true,
  imports: [RateTables1Component],
  selector: 'shared-bullion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: LiveRateService,
      useClass: DemoLiveRateService,
    },
    {
      provide : Env ,
      useValue:{}
    }
  ],
})
export class AppComponent {
  title = 'component-testing-bed';

  
}
