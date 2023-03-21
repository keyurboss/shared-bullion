import { Component} from '@angular/core';
import { NgFor} from '@angular/common';
import { RouterModule } from '@angular/router';
interface navbar{
  name:string;
  routerLink:string;
}
@Component({
  selector: 'akshat-bull-app-header',
  standalone: true,
  imports: [NgFor , RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  data: navbar[]=[
    {
      name:'ABOUT US',
      routerLink:'/about-us',
    },
    {
      name:'LIVE RATE',
      routerLink:'/live-rate',
    },
    {
      name:'LAGDIS',
      routerLink:'/lagdis',
    },
    {
      name:'MESSAGES',
      routerLink:'/messages',
    },
    {
      name:'BANK DETAILS',
      routerLink:'/bank-details',
    },
    {
      name:'CONTACT US',
      routerLink:'/contact-us',
    },
    {
      name:'LOGIN',
      routerLink:'##',
    },
  ];
}
