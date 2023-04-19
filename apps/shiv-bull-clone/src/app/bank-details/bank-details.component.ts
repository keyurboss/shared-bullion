import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Input } from 'postcss';

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
  imports: [NgFor],
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

  clipboard(num: string) {
    if (navigator.clipboard) {
      this.alay = true;
      setTimeout(() => {
        this.alay = false;
      }, 100);
      const textToCopy = num;
      console.log(num);
      navigator.clipboard.writeText(textToCopy);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = num;
      document.body.appendChild(textArea);
      textArea.select();
      document.body.removeChild(textArea);
    }
    const popupBox = document.querySelector('#popUpId') as HTMLDivElement;
    popupBox.style.display = 'flex';
    setTimeout(() => {
      popupBox.style.display = 'none';
    }, 1000);
  }

  showButton() {
    const hide = document.querySelector('.hide') as HTMLDivElement;
    if (hide.style.display == 'none') {
      hide.style.display = 'flex';
    }
  }
  // hideButton1(){
  //   const hide1= document.querySelector('.hide1') as HTMLDivElement;
  //   hide1.style.display='none';
  // }
  // showButton1(){
  //   const show1= document.querySelector('.hide1') as HTMLDivElement;
  //   show1.style.display='flex';
  // }
}
