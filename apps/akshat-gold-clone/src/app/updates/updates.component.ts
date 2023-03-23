import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface component {
  tittle: string;
  content: string;
  updated_time: string;
}

@Component({
  selector: 'akshat-gold-updates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
})
export class UpdatesComponent {
  data: component[] = [
    {
      tittle: 'Welcome',
      content: 'Welcome To Akshat Gold',
      updated_time: 'Updated at Mar 23, 2023, 3:04:15 PM',
    },
    {
      tittle: 'News',
      content: 'Office Is Closed Today',
      updated_time: 'Updated at Mar 23, 2023, 3:04:15 PM',
    },
  ];
}
