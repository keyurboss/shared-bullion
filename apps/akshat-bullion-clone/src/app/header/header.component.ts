import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
interface navbar {
  name: string;
  routerLink: string;
}
@Component({
  selector: 'akshat-bull-app-header',
  standalone: true,
  imports: [NgFor, RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showdownloadheader = true;
  Input_data = {
    marquee: 'Welcome To Akshat Bullion.',
    Download_Apps: 'Download Apps',
    Download_router_link:'app/home/Downloadapp'
  }
  images = {
    akshat_bull_logo: '/assets/images/Akshat bullion logo.svg',
    download_outline: '/assets/images/download-outline.svg',
  }
  data: navbar[] = [
    {
      name: 'ABOUT US',
      routerLink: 'app/home/about-us',
    },
    {
      name: 'LIVE RATE',
      routerLink: 'app/home/live-rate',
    },
    {
      name: 'LAGDIS',
      routerLink: 'app/home/lagdis',
    },
    {
      name: 'MESSAGES',
      routerLink: 'app/home/messages',
    },
    {
      name: 'BANK DETAILS',
      routerLink: 'app/home/bank-details',
    },
    {
      name: 'CONTACT US',
      routerLink: 'app/home/contact-us',
    },
    {
      name: 'LOGIN',
      routerLink: '/login',
    },
  ];
}
