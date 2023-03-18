import { Component} from '@angular/core';
import { NgFor} from '@angular/common';
import { RouterLink } from '@angular/router';
interface navbar{
  name:string;
  url:string;
}
@Component({
  selector: 'akshat-bull-app-header',
  standalone: true,
  imports: [NgFor , RouterLink],
//   encapsulation:ViewEncapsulation.ShadowDom,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  data: navbar[]=[
    {
      name:'ABOUT US',
      url:'',
    },
    {
      name:'LIVE RATE',
      url:'',
    },
    {
      name:'LAGDIS',
      url:'',
    },
    {
      name:'MESSAGES',
      url:'',
    },
    {
      name:'BANK DETAILS',
      url:'',
    },
    {
      name:'CONTACT US',
      url:'contact',
    },
    {
      name:'LOGIN',
      url:'',
    },
  ];
}
