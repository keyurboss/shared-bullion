import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface navbar {
  name: string;
  router_link: string;
}

@Component({
  selector: 'shiv-bull-app-header',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  data: navbar[] = [
    {
      name: 'About',
      router_link: 'home/about',
    },
    {
      name: 'Live Rate',
      router_link: 'home/live-rate',
    },
    {
      name: 'Updates',
      router_link: 'home/update',
    },
    {
      name: 'Bank Details',
      router_link: 'home/bank-details',
    },
    {
      name: 'Economic Calendar',
      router_link: 'home/eco-calendar',
    },
    {
      name: 'Contact Us',
      router_link: 'home/contact-us',
    },
        
  ];
  data2=[
    {
      name:'login',
      router_link:'login',
    }
  ]
}
