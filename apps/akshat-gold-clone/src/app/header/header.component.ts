import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'akshat-gold-header',
  standalone: true,
  imports: [CommonModule,NgFor,RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() SERVICES_HOUR = 'SERVICES HOUR:';
  @Input() BOOKING_NUBERS = 'BOOKING NUBERS:';
  data=[
    { name:"ABOUT US",
       router_link:"home/about-us",
   },
    { name:"LIVE RATE",
       router_link:"home/live-rate",
   },
    { name:"UPDATES",
       router_link:"home/updates",
   },
    { name:"BANK DETAILS",
       router_link:"home/bank-details",
   },
    { name:"APP",
       router_link:"home/app",
   },
    { name:"CONTACT US",
       router_link:"home/contact-us",
   },
    { name:"ECO CALENDER",
       router_link:"home/eco-calender",
   },
    { name:"LOGIN",
       router_link:"home/live-rate/login",
   },
  
  ]

}
