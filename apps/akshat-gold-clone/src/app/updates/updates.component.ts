import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface component {
  tittle: string;
  content: string;
  updated_time: number;
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
      updated_time:1679571409000,
    },
    {
      tittle: 'News',
      content: 'Office Is Closed Today',
      updated_time:1679571409000,

    },
  ];
}
