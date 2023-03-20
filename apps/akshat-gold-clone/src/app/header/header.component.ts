import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'akshat-gold-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() SERVICES_HOUR = 'SERVICES HOUR:';
  @Input() BOOKING_NUBERS = 'BOOKING NUBERS:';
  data=[
    { name:"about",
       url:"",
   },
    { name:"live rate",
       url:"",
   },
    { name:"updates",
       url:"",
   },
    { name:"Bank details",
       url:"",
   },
    { name:"App",
       url:"",
   },
    { name:"about",
       url:"",
   },
    { name:"about",
       url:"",
   },
  ]

}
