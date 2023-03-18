import { Route } from '@angular/router';
import { ABOUTUSComponent } from './about-us/about-us.component';

export const appRoutes: Route[] = [
    {
        path:'',
        component:ABOUTUSComponent
    },
    {
        path:'contact',
        loadComponent:() => import('./contact-us/contact-us.component').then((a)=>a.CONTACTUSComponent)
    },

];
