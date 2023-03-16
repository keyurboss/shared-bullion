import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Env } from '@rps/buillion-frontend-core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
import { LiveRateService } from '@rps/buillion-frontend-core/services';
import { RateTables1Component, RateTables2Component } from '@rps/bullion-rate-tables';

@Component({
  standalone: true,
  imports: [RateTables1Component ,RateTables2Component,ReactiveFormsModule],
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
