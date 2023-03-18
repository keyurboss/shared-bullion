import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
    {
        path:'',
        // redirectTo:'home',
        // pathMatch:'full',
        component:HomeComponent,
        children:[
            {
                path:'',
                loadComponent:() => import('./about-us/about-us.component').then((a)=>a.AboutusComponent)
            },
            {
                path:'about-us',
                loadComponent:() => import('./about-us/about-us.component').then((a)=>a.AboutusComponent)
            },
            {
                path:'live-rate',
                loadComponent:() => import('./live-rate/live-rate.component').then((a)=>a.LiveRateComponent)
            },
            {
                path:'lagdis',
                loadComponent:() => import('./lagdis/lagdis.component').then((a)=>a.LagdisComponent)
            },
            {
                path:'messages',
                loadComponent:() => import('./messages/messages.component').then((a)=>a.MessagesComponent)
            },
            {
                path:'bank-details',
                loadComponent:() => import('./bank-details/bank-details.component').then((a)=>a.BankdetailsComponent)
            },
            {
                path:'contact-us',
                loadComponent:() => import('./contact-us/contact-us.component').then((a)=>a.ContactUsComponent)
            },
        ]
    },
    // {
    //     path:'**',
    //     component:HomeComponent,
    // },
];
