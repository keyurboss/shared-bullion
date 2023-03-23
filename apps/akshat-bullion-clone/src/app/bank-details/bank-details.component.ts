import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
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
  imports: [CommonModule, NgFor],
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
})
export class BankdetailsComponent {
  bank_data_tittle={
    account_name:"Account Name",
    bank_name:"Bank Name",
    account_no:"Account No",
    isfc_code:"IFSC Code",
    branch_name:"Branch Name",
  }
  data: bankdata[] = [
    {
      id: 1,
      accountname: 'Akshat Bullion',
      bankname: 'Axis Bank',
      accountnumber: '9200-2006-575-5340',
      IFSCCode: 'UTIB-000-4758',
      branchname: 'Balasinor',
      img: '../../assets/images/Axis_Bank_Logo.png',
    },
    // {
    //   id: 2,
    //   accountname: 'Akshat Bullion',
    //   bankname: 'Axis Bank',
    //   accountnumber: '9200-2006-575-5340',
    //   IFSCCode: 'UTIB-000-4758',
    //   branchname: 'Balasinor',
    //   img: '../../assets/images/icic_Bank_Logo.jpg',
    // },
    // {
    //   id: 1,
    //   accountname: 'Akshat Bullion',
    //   bankname: 'Axis Bank',
    //   accountnumber: '9200-2006-575-5340',
    //   IFSCCode: 'UTIB-000-4758',
    //   branchname: 'Balasinor',
    //   img: '../../assets/images/Axis_Bank_Logo.png',
    // },
    // {
    //   id: 2,
    //   accountname: 'Akshat Bullion',
    //   bankname: 'Axis Bank',
    //   accountnumber: '9200-2006-575-5340',
    //   IFSCCode: 'UTIB-000-4758',
    //   branchname: 'Balasinor',
    //   img: '../../assets/images/icic_Bank_Logo.jpg',
    // },
  ];
}
