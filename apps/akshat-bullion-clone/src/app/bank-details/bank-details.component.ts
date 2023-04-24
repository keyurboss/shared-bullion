import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
interface bankdata {
  id: number;
  accountname: string;
  accountnumber: string;
  bankname: string;
  branchname: string;
  img: string;
  IFSCCode: string;
}

@Component({
  selector: 'akshat-bull-app-bank-details',
  standalone: true,
  imports: [CommonModule, NgFor, ClipboardModule],
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
})
export class BankdetailsComponent {
  message = '';
  showMessage = false;
  disabled = false;
  bank_data_tittle = {
    account_name: "Account Name",
    bank_name: "Bank Name",
    account_no: "Account No",
    isfc_code: "IFSC Code",
    branch_name: "Branch Name",
  }
  data: bankdata[] = [
    {
      id: 4,
      accountname: 'Akshat Bullion',
      bankname: 'Axis Bank',
      accountnumber: '9200-2006-575-5340',
      IFSCCode: 'UTIB-000-4758',
      branchname: 'Balasinor',
      img: '../../assets/images/Axis_Bank_Logo.png',
    },
  ];
  timeoutId: NodeJS.Timeout;
  removeHyphens(cardNumber: string): string {
    return cardNumber.replace(/-/g, '');
  }
  async startTimeout(num: any) {
    function hasAlphabet(input: string): boolean {
      const regex = /[a-zA-Z]/;
      return regex.test(input);
    }
    const textToCopy = num;
    if (hasAlphabet(textToCopy) === true) {
      this.message = 'IFSC Code Copied.....'
    } else {
      this.message = 'Account Number Copied.....'
    }
    if (!this.disabled) {
      this.showMessage = true;
      this.timeoutId = setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    }
  }
  cancelTimeout() {
    clearTimeout(this.timeoutId);
  }
  restartTimeout(num: any) {
    this.cancelTimeout();
    this.startTimeout(num);
  }
}
