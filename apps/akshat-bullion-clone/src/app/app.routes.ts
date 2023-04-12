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
      import('./home/home.component').then((a) => a.default),
    children: [
      {
        path: '',
        redirectTo: 'app/home/live-rate',
        pathMatch: 'full',
      },
      {
        path: 'app/home/about-us',
        loadComponent: () =>
          import('./about-us/about-us.component').then(
            (a) => a.AboutusComponent
          ),
      },
      {
        path: 'app/home/live-rate',
        loadComponent: () =>
          import('./live-rate/live-rate.component').then(
            (a) => a.LiveRateComponent
          ),
      },
      {
        path: 'app/home/lagdis',
        loadComponent: () =>
          import('./lagdis/lagdis.component').then((a) => a.LagdisComponent),
      },
      {
        path: 'app/home/messages',
        loadComponent: () =>
          import('./messages/messages.component').then(
            (a) => a.MessagesComponent
          ),
      },
      {
        path: 'app/home/bank-details',
        loadComponent: () =>
          import('./bank-details/bank-details.component').then(
            (a) => a.BankdetailsComponent
          ),
      },
      {
        path: 'app/home/contact-us',
        loadComponent: () =>
          import('./contact-us/contact-us.component').then(
            (a) => a.ContactUsComponent
          ),
      },
      {
        path: 'app/home/Downloadapp',
        loadComponent: () =>
          import('./app/app.component').then(
            (a) => a.MAppComponent
          ),
      },
    ],
  },
  {
    path: 'otp',
    loadComponent: () =>
      import('./otp/otp.component').then((a) => a.OtpComponent),
  },
  {
    path: 'error404',
    loadComponent: () =>
      import('./error404/error404.component').then((a) => a.Error404Component),
  },
  {
    path: 'termsNpolicy/tnc',
    loadComponent: () =>
      import('./terms-npolicy/terms-npolicy.component').then((a) => a.TermsNpolicyComponent),
  },
  {
    path: '**',
    redirectTo: 'error404',
  },
];
