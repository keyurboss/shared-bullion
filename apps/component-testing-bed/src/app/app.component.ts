import { Component } from '@angular/core';
import { RateTables1Component } from '@rps/bullion-rate-tables';
import { RateTables3Component } from '@rps/bullion-rate-tables';
import { LiveRateService } from '@rps/buillion-frontend-core/services';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Env } from '@rps/buillion-frontend-core';
@Component({
  standalone: true,
  imports: [RateTables1Component,RateTables3Component,ReactiveFormsModule],
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
