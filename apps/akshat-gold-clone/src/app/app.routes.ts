import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import * as path from 'path';

export const appRoutes: Route[] = [
    {
      path: '',
      component: HomeComponent,
      children: [
        {
          path: '',
          redirectTo: 'live-rate',
          pathMatch: 'full',
        },
        {
          path: 'about-us',
          loadComponent: () =>
            import('./about-us/about-us.component').then((a) => a.AboutUsComponent),
        },
        {
          path: 'live-rate',
          loadComponent: () =>
            import('./live-rate/live-rate.component').then(
              (a) => a.LiveRateComponent
            ),
        },
        {
          path: 'updates',
          loadComponent: () =>
            import('./updates/updates.component').then((a) => a.UpdatesComponent),
        },
        {
          path: 'bank-details',
          loadComponent: () =>
            import('./bank-details/bank-details.component').then(
              (a) => a.BankDetailsComponent
            ),
        },
        {
          path: 'eco-calender',
          loadComponent: () =>
            import('./eco-calendar/eco-calendar.component').then(
              (a) => a.EcoCalendarComponent
            ),
        },
        {
          path: 'contact-us',
          loadComponent: () =>
            import('./contact-us/contact-us.component').then(
              (a) => a.ContactUsComponent
            ),
        },
        {
          path: '**',
          redirectTo: 'live-rate',
          pathMatch: 'full',
        },
      ],
    },
  ];
