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
  }
  images = {
    akshat_bull_logo: '/assets/images/Akshat bullion logo.svg',
    download_outline: '/assets/images/download-outline.svg',
  }
  data: navbar[] = [
    {
      name: 'ABOUT US',
      routerLink: 'home/about-us',
    },
    {
      name: 'LIVE RATE',
      routerLink: 'home/live-rate',
    },
    {
      name: 'LAGDIS',
      routerLink: 'home/lagdis',
    },
    {
      name: 'MESSAGES',
      routerLink: 'home/messages',
    },
    {
      name: 'BANK DETAILS',
      routerLink: 'home/bank-details',
    },
    {
      name: 'CONTACT US',
      routerLink: 'home/contact-us',
    },
    {
      name: 'LOGIN',
      routerLink: '/login',
    },
  ];
  hidedownloadheader() {
    this.showdownloadheader = false;
  }
}
