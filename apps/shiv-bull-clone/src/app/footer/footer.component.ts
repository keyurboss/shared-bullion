import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBar3Component, navbar3 } from '@rps/angular-nav-bars';
import { RouterModule} from '@angular/router';

interface navigationBar {
  uid: string;
  router_link: string;
}
@Component({
  selector: 'shiv-bull-app-footer',
  standalone: true,
  imports: [CommonModule, NavBar3Component,RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  navbar: navbar3[] = [
    {
      uid: '1',
      icon: {
        url: '../../assets/images/newspaper-outline.svg',
        inactive_color: 'var(--header-bg)',
        active_color: 'white',
        
      },
      name: 'News',
      indicator_color: '#543e12',
    },
    {
      uid: '2',
      icon: {
        url: '../../assets/images/icon_bank_detail.svg',
        inactive_color: 'var(--header-bg)',
        active_color: 'white',
      },
      name: 'Bank-Details',
      indicator_color: '#543e12',
    },
    {
      uid: '3',
      icon: {
        url: '../../assets/images/nav_Lagdi_logo.svg',
        inactive_color: 'var(--header-bg)',
        active_color: 'white',
      },
      name: 'Live-Rate',
      indicator_color: '#543e12',
    },
    {
      uid: '4',
      icon: {
        url: '../../assets/images/nav_contact_logo.svg',
        inactive_color: 'var(--header-bg',
        active_color: 'white',
      },
      name: 'Contact-us',
      indicator_color: '#543e12',
    },
    {
      uid: '5',
      icon: {
        url: '../../assets/images/calendar-outline.svg',
        inactive_color: 'var(--header-bg',
        active_color: 'white',
      },
      name: 'Eco.Calander',
      indicator_color: '#543e12',
    },

  ];




  // data: navigationBar[]=[
  //   {
  //     uid:'1',
  //     router_link:'home/about',
  //   },
  //   {
  //     uid:'2',
  //     router_link:'home/bank-details',
  //   },
  //   {
  //     uid:'3',
  //     router_link:'home/live-rate',
  //   },
  //   {
  //     uid:'4',
  //     router_link:'home/contact-us',
  //   },
  //   {
  //     uid:'5',
  //     router_link:'home/update',
  //   },
  // ]

  
//   title = 'detect-route-change';
//   currentRoute: string;

//   constructor(private router: Router) {
//     this.currentRoute = "";
//     this.router.events.subscribe((event: Event) => {
//         if (event instanceof NavigationStart) {
//             // Show progress spinner or progress bar
//             console.log('Route change detected');
//         }

//         if (event instanceof NavigationEnd) {
//             // Hide progress spinner or progress bar
//             this.currentRoute = event.url;          
//             console.log(event);
//         } 
//     });


// }
}