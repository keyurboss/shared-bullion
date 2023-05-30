import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ClipboardModule} from "@angular/cdk/clipboard";

interface bankdata {
  id: number;
  accountname: string;
  accountnumber: string;
  bankname: string;
  branchname: string;
  IFSCCode: string;
  img: string;
}
@Component({
  selector: 'shiv-bull-app-bank-details',
  standalone: true,
  imports: [NgFor,ClipboardModule],
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
})
export class BankDetailsComponent {
  alay = false;
  // copyText:[string];
  // copyNumber{}{
  //   navigator.clipboard.writeText(copyText.value);

  // }
  banks: bankdata[] = [
    {
      id: 1,
      accountname: 'SHIV ENTERPRISE',
      accountnumber: '138305500445',
      bankname: 'ICICI BANK',
      branchname: 'PALACE ROAD,RAJKOT',
      IFSCCode: 'ICIC0001383',
      img: '../../assets/images/icic_logo.jpg',
    },
    // {
    //   id: 4,
    //   accountname: 'SHIV ENTERPRISE',
    //   accountnumber: '138305500445',
    //   bankname: 'ICICI BANK',
    //   branchname: 'PALACE ROAD,RAJKOT',
    //   IFSCCode: 'ICIC0001383',
    //   img:'../../assets/images/AXISbanklogo.png'
    // },

    // {
    //   id: 2,
    //   accountname: 'SHIV ENTERPRISE',
    //   accountnumber: '138305500445',
    //   bankname: 'ICICI BANK',
    //   branchname: 'PALACE ROAD,RAJKOT',
    //   IFSCCode: 'ICIC0001383',
    //   img:'../../assets/images/AXISbanklogo.png'
    // },

    // {
    //   id: 3,
    //   accountname: 'SHIV ENTERPRISE',
    //   accountnumber: '138305500445',
    //   bankname: 'ICICI BANK',
    //   branchname: 'PALACE ROAD,RAJKOT',
    //   IFSCCode: 'ICIC0001383',
    //   img:'../../assets/images/icic_logo.jpg'
    // },
  ];

  showHide() {
    const popupBox = document.querySelector('#popUpId') as HTMLDivElement;
    popupBox.style.display = 'flex';
    setTimeout(() => {
      popupBox.style.display = 'none';
    }, 1000)

  }
}
