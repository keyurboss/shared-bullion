import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((a) => a.LoginComponent),
  },
  {
    path: 'sign-up',

    loadComponent: () =>
      import('./sign-up/sign-up.component').then((a) => a.SignUpComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((a) => a.HomeComponent),
    children: [
      {
        path: '',
        redirectTo: 'home/live-rate',
        pathMatch: 'full',
      },
      {
        path: 'home/about-us',
        loadComponent: () =>
          import('./about-us/about-us.component').then(
            (a) => a.AboutusComponent
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
        path: 'home/lagdis',
        loadComponent: () =>
          import('./lagdis/lagdis.component').then((a) => a.LagdisComponent),
      },
      {
        path: 'home/messages',
        loadComponent: () =>
          import('./messages/messages.component').then(
            (a) => a.MessagesComponent
          ),
      },
      {
        path: 'home/bank-details',
        loadComponent: () =>
          import('./bank-details/bank-details.component').then(
            (a) => a.BankdetailsComponent
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
        path: 'home/Downloadapp',
        loadComponent: () =>
          import('./app/app.component').then(
            (a) => a.MAppComponent
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
