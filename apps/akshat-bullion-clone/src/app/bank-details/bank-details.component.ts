import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
interface bankdata {
  id: number;
  accountname: string;
  accountnumber: string;
  Copyaccountnumber: string;
  bankname: string;
  branchname: string;
  img: string;
  IFSCCode: string;
  CopyIFSCCode: string;
}

@Component({
  selector: 'akshat-bull-app-bank-details',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
})
export class BankdetailsComponent {
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
      Copyaccountnumber: '920020065755340',
      IFSCCode: 'UTIB-000-4758',
      CopyIFSCCode: 'UTIB0004758',
      branchname: 'Balasinor',
      img: '../../assets/images/Axis_Bank_Logo.png',
    },
    // {
    //   id: 1,
    //   accountname: 'Akshat Bullion',
    //   bankname: 'Axis Bank',
    //   accountnumber: '1111-1111-111-1111',
    //   IFSCCode: 'UTIB-000-1111',
    //   Copyaccountnumber: '111111111111111',
    //   CopyIFSCCode: 'UTIB0001111',
    //   branchname: 'Balasinor',
    //   img: '../../assets/images/icic_Bank_Logo.jpg',
    // },
    // {
    //   id: 2,
    //   accountname: 'Akshat Bullion',
    //   bankname: 'Axis Bank',
    //   accountnumber: '2222-2222-222-2222',
    //   IFSCCode: 'UTIB-000-2222',
    //   Copyaccountnumber: '222222222222222',
    //   CopyIFSCCode: 'UTIB0002222',
    //   branchname: 'Balasinor',
    //   img: '../../assets/images/Axis_Bank_Logo.png',
    // },
    // {
    //   id: 3,
    //   accountname: 'Akshat Bullion',
    //   bankname: 'Axis Bank',
    //   accountnumber: '3333-3333-333-3333',
    //   IFSCCode: 'UTIB-000-3333',
    //   Copyaccountnumber: '333333333333333',
    //   CopyIFSCCode: 'UTIB0003333',
    //   branchname: 'Balasinor',
    //   img: '../../assets/images/icic_Bank_Logo.jpg',
    // },
  ];
  async copyToClipboard(num: any) {
    const textToCopy = num;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy)
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = num;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }
}
