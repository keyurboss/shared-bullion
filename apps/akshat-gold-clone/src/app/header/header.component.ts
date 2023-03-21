import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'akshat-gold-header',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() SERVICES_HOUR = 'SERVICES HOUR:';
  @Input() BOOKING_NUBERS = 'BOOKING NUBERS:';
  data=[
    { name:"ABOUT US",
       url:"",
   },
    { name:"LIVE RATE",
       url:"",
   },
    { name:"UPDATES",
       url:"",
   },
    { name:"BANK DETAILS",
       url:"",
   },
    { name:"APP",
       url:"",
   },
    { name:"CONTACT US",
       url:"",
   },
    { name:"ECO. CALENDER",
       url:"",
   },
  
  ]

}
