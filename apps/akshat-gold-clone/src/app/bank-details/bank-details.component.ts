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
  message = '';
  showMessage = false;
  disabled = false;
  // clipboard(num: string) {
  //   navigator.clipboard.writeText(num);
  // }
  async clipboard(num: any) {
    function hasAlphabet(input: string): boolean {
      const regex = /[a-zA-Z]/;
      return regex.test(input);
    }
    const textToCopy = num;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = num;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
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
