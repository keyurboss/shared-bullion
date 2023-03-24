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
       router_link:"about-us",
   },
    { name:"LIVE RATE",
       router_link:"live-rate",
   },
    { name:"UPDATES",
       router_link:"updates",
   },
    { name:"BANK DETAILS",
       router_link:"bank-details",
   },
    { name:"APP",
       router_link:"app",
   },
    { name:"CONTACT US",
       router_link:"contact-us",
   },
    { name:"ECO CALENDER",
       router_link:"eco-calender",
   },
    { name:"LOGIN",
       router_link:"login",
   },
  
  ]

}
