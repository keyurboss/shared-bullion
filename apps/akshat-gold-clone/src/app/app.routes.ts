import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import * as path from 'path';

export const appRoutes: Route[] = [
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component').then((a) => a.SignupComponent),
  },
  {
    path: 'terms-and-con',
    loadComponent: () =>
      import('./terms-and-con/terms-and-con.component').then(
        (a) => a.TermsAndConComponent
      ),
  },
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
        path: 'home/about-us',
        loadComponent: () =>
          import('./about-us/about-us.component').then(
            (a) => a.AboutUsComponent
          ),
      },
      {
        path: 'home/live-rate',
        loadComponent: () =>
          import('./live-rate/live-rate.component').then(
            (a) => a.LiveRateComponent
          ),
      },
      {
        path: 'home/updates',
        loadComponent: () =>
          import('./updates/updates.component').then((a) => a.UpdatesComponent),
      },
      {
        path: 'home/bank-details',
        loadComponent: () =>
          import('./bank-details/bank-details.component').then(
            (a) => a.BankDetailsComponent
          ),
      },
      {
        path: 'home/app',
        loadComponent: () =>
          import('./apps/apps.component').then((a) => a.AppsComponent),
      },
      {
        path: 'home/eco-calender',
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
        path: 'home/live-rate/login',
        loadComponent: () =>
          import('./login/login.component').then((a) => a.LoginComponent),
      },
      {
        path: '**',
        redirectTo: 'live-rate',
        pathMatch: 'full',
      },
    ],
  },
];
