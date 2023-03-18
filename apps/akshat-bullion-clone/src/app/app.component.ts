import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RateTables6Component } from '@rps/bullion-rate-tables/table6';
import { Env, LiveRateService } from '@rps/buillion-frontend-core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';


@Component({
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RateTables6Component],
  selector: 'akshat-bull-app-root',
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
  title = 'akshat-bullion-clone';
}

