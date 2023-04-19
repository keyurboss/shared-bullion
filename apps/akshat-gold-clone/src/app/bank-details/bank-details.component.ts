import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'akshat-gold-bank-details',
  standalone: true,
  imports: [CommonModule, ClipboardModule],
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
})
export class BankDetailsComponent {
  bank={
    AN:'921-0200-4224-1964',
    CAN:'921020042241964',
    IFSCCODE:'UTIB-0003-606',
    CIFSCCODE:'UTIB0003606',
  }
  message = '';
  showMessage = false;
  disabled = false;
  async clipboard(num: any) {
    function hasAlphabet(input: string): boolean {
      const regex = /[a-zA-Z]/;
      return regex.test(input);
    }
    const textToCopy = num;
    if (!this.disabled) {
      if (hasAlphabet(textToCopy) === true) {
        this.message = 'IFSC Code Copied.....';
      } else {
        this.message = 'Account Number Copied.....';
      }
      this.showMessage = true;
      this.disabled = true;

      setTimeout(() => {
        this.showMessage = false;
        this.disabled = false;
      }, 1500);
    }
  }
}
