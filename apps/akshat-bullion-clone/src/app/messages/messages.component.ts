import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface messages {
  tittle: string;
  content: string;
  updated_time: string;
}
@Component({
  selector: 'akshat-bull-app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  data: messages[] = [
    {
      tittle: 'Welcome',
      content: ' We are welcome you to Akshat Bullion 🙏 ',
      updated_time: 'Updated at Apr 1, 2023, 3:42:40 PM',
    },
    {
      tittle: 'For account',
      content: 'To activate your account kindly contact to Akshat shah.',
      updated_time: 'Updated at Apr 1, 2023, 3:43:43 PM',
    },
  ];
}
