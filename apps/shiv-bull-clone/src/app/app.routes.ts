import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
    
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'home/live-rate',
        pathMatch: 'full',
      },
      {
        path: 'home/about',
        loadComponent: () =>
          import('./about/about.component').then((a) => a.AboutComponent),
      },
      {
        path: 'home/live-rate',
        loadComponent: () =>
          import('./live-rate/live-rate.component').then(
            (a) => a.LiveRateComponent
          ),
      },
      {
        path: 'home/update',
        loadComponent: () =>
          import('./update/update.component').then((a) => a.UpdateComponent),
      },
      
      {
        path: 'home/bank-details',
        loadComponent: () =>
          import('./bank-details/bank-details.component').then(
            (a) => a.BankDetailsComponent
          ),
      },
      {
        path: 'home/eco-calendar',
        loadComponent: () =>
          import('./eco-calendar/eco-calendar.component').then(
            (a) => a.EcoCalendarComponent
          ),
      },
      {
        path: 'home/contact-us',
        loadComponent: () =>
          import('./contact-us/contact-us.component').then(
            (a) => a.ContactUsComponent
          ),
      },
      
      {
        path: '**',
        redirectTo: 'home/live-rate',
        pathMatch: 'full',
      },
    ],
  },
];
