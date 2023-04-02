import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'akshat-gold-bank-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
})
export class BankDetailsComponent {
  clipboard(num: string) {
    navigator.clipboard.writeText(num);
  }
}
