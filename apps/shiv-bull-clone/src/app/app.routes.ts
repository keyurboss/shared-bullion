import { Route } from '@angular/router';
// import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full',
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./about/about.component').then((a) => a.AboutComponent),
      },
      {
        path: 'live-rate',
        loadComponent: () =>
          import('./live-rate/live-rate.component').then(
            (a) => a.LiveRateComponent
          ),
      },
      {
        path: 'update',
        loadComponent: () =>
          import('./update/update.component').then((a) => a.UpdateComponent),
      },

      {
        path: 'bank-details',
        loadComponent: () =>
          import('./bank-details/bank-details.component').then(
            (a) => a.BankDetailsComponent
          ),
          canActivate:[AuthGuard]
      },
      {
        path: 'eco-calendar',
        loadComponent: () =>
          import('./eco-calendar/eco-calendar.component').then(
            (a) => a.EcoCalendarComponent
          ),
          canActivate:[AuthGuard]
      },
      {
        path: 'contact-us',
        loadComponent: () =>
          import('./contact-us/contact-us.component').then(
            (a) => a.ContactUsComponent
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'prefix',
  },
  {
    path: '**',
    redirectTo: 'home/about',
    pathMatch: 'full',
  },
];
