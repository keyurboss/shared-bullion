import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { Env, LiveRateService } from '@rps/buillion-frontend-core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
import { RouterOutlet } from '@angular/router';


@Component({
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
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

