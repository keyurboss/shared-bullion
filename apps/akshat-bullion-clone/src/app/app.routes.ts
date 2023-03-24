import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const appRoutes: Route[] = [
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'sign-up',
    component: SignUpComponent,
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
        path: '**',
        redirectTo: 'home/live-rate',
        pathMatch: 'full',
      },
    ],
  },
];
