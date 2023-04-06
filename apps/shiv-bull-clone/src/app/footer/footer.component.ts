import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBar3Component, navbar3 } from '@rps/angular-nav-bars';
import { RouterModule } from '@angular/router';

// interface navbar {
//   uid: string;
//   icon:{url:string,inactive_color: string,active_color:string,};

//   name: string;
//   indicator_color:string
//   router_link: string;
// }
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

}