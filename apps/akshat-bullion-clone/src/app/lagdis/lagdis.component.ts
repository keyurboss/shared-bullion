import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';

@Component({
  selector: 'akshat-bull-app-lagdis',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './lagdis.component.html',
  styleUrls: ['./lagdis.component.scss'],
})
export class LagdisComponent {
  header_data={
    header:"LAGDI",
    gold:"GOLD",
    silver:"SILVER",
  }
  data=[
    {leftdata:"1 GM",
    centerdata:"5900", 
    rightdata:"75",
    class:"class"  
  },
    {leftdata:"2 GM",
    centerdata:"11700", 
    rightdata:"150",
    class:""  
  },
    {leftdata:"5 GM",
    centerdata:"29100", 
    rightdata:"330",
    class:"class"  
  },
    {leftdata:"10 GM",
    centerdata:"58100", 
    rightdata:"660",
    class:""  
  },
    {leftdata:"20 GM",
    centerdata:"116100", 
    rightdata:"1320",
    class:"class"  
  },
    {leftdata:"50 GM",
    centerdata:"290100", 
    rightdata:"3300",
    class:""  
  },
    {leftdata:"100 GM",
    centerdata:"580100", 
    rightdata:"6600",
    class:"class"  
  },
  
  ]
}
