import { Component } from '@angular/core';
import {NgFor } from '@angular/common';
// interface comments{
//   logo:string;
//   name:string;
//   info:string[];
// }
@Component({
  selector: 'shiv-bull-app-contact-us',
  standalone: true,
  imports: [NgFor],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  data1= [
    {
      logo: "../../assets/images/mapicon.svg",
      name: "ADDRESS",
      info:['BRAHMANIYA PARA ,STREET NO 4, B/H.JINIVA DYING,SANTKABIR ROAD,RAJKOT - 360003      ']

    },]
    data2=[
    {
      logo: "../../assets/images/mailicon.svg",
      name: "EMAIL",
      info:['SHIVENTERPRISE.JP@GMAIL.COM']

    },]
  data3=[  
    {
      logo: "../../assets/images/phone-callicon.svg",
      logo2: "../../assets/images/phone-callicon copy.svg",
      name: "PHONE",
      info:[' 145843436413','131355456454','4514543356535']

    },
  ]
}
