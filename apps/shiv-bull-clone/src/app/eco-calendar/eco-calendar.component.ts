import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shiv-bull-app-eco-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eco-calendar.component.html',
  styleUrls: ['./eco-calendar.component.scss'],
})
export class EcoCalendarComponent {
  ase(){

    const hi = document.getElementById("main")?.offsetHeight;
    console.log(hi);
    
  }
}
