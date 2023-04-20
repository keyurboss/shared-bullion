import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavBar3Component } from '@rps/angular-nav-bars';

interface navigationBar {
  router_link: string;
}

// <********************interface-for-navbar*********************>

interface navbar3 extends navigationBar {
  uid: string;
  router_link: string;
  icon: {
    url: string;
    inactive_color: string;
    active_color: string;
  };
  name: string;
  indicator_color: string;
}

@Component({
  selector: 'akshat-gold-clone-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBar3Component],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  navbar: navbar3[] = [
    {
      uid: '1',
      router_link: 'home/bank-details',
      icon: {
        url: '../../assets/images/bank.svg',
        active_color: 'white',
        inactive_color: '#41241c',
      },
      name: 'Bank',
      indicator_color: '#543e12',
    },
    {
      uid: '2',
      router_link: 'home/contact-us',
      icon: {
        url: '../../assets/images/call.svg',
        active_color: 'white',
        inactive_color: '#41241c',
      },
      name: 'Contact US',
      indicator_color: '#543e12',
    },
    {
      uid: '3',
      router_link: 'home/live-rate',
      icon: {
        url: '../../assets/images/liverate_new.svg',
        active_color: 'white',
        inactive_color: '#41241c',
      },
      name: 'LiveRate',
      indicator_color: '#543e12',
    },
    {
      uid: '4',
      router_link: 'home/updates',
      icon: {
        url: '../../assets/images/mail.svg',
        active_color: 'white',
        inactive_color: '#41241c',
      },
      name: 'Updates',
      indicator_color: '#543e12',
    },
    {
      uid: '5',
      router_link: 'home/live-rate/login',
      icon: {
        url: '../../assets/images/person.svg',
        active_color: 'white',
        inactive_color: '#41241c',
      },
      name: 'Login',
      indicator_color: '#543e12',
    },
  ];

  // <**********************footer-left*****************************>

  footer_data: { name: string; url: string }[] = [
    {
      name: 'About Us',
      url: 'home/about-us',
    },
    {
      name: 'Updates',
      url: 'home/updates',
    },
    {
      name: 'Bank Details',
      url: 'home/bank-details',
    },
    {
      name: 'Contact Us',
      url: 'home/contact-us',
    },
  ];

  // <******************************navbar********************************>

  active_uid = '3';
  constructor(private routes: Router) {}
  OnChangeEvent(valueEitted: string) {
    if (this.active_uid === valueEitted) {
      return;
    }
    console.log(valueEitted);
    this.active_uid = valueEitted;
    const found = this.navbar.find(({ uid }) => uid === this.active_uid);
    if (found) {
      this.routes.navigateByUrl(`${found?.router_link}`);
      console.log(found?.router_link);
      console.log(found);
    }
  }
}
