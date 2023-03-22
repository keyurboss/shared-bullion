import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
interface navbar{
  name:string;
  routerLink:string;
}
@Component({
  selector: 'akshat-bull-app-footer',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  data: navbar[]=[
    {
      name:'ABOUT US',
      routerLink:'/about-us',
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
  ];
}
