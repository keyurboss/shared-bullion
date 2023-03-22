import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
interface component {
  tittle: string;
  content: string[];
}

@Component({
  selector: 'akshat-gold-about-us',
  standalone: true,
  imports: [NgFor],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent {
  data: component[] = [
    {
      tittle: 'WELCOME TO AKSHAT GOLD PVT LTD',
      content: [
        ' AKSHAT GOLD PVT LTD was founded in 2016 by MAYANK SHAH who is doingbusiness for many year. Blend of his passion and experience in the Gold&amp;Silver industry have created the organization with customer oriented.   It is located in the heart city of Ahmedabad. ',
        'It is a fast growing organization having excellent track record with suppliers all over region and gains reputation in the industry. His innovative and intelligent ideas enhance our business network.'
      ],
    },
    {
      tittle: 'STRENGTH',
      content: [
        'We believe delivery on time and transparent trade policies made possible to achieve the important place in the business within the short span of time. In the competitive arena AKSHAT GOLD PVT LTD obliged to satisfy its customer and suppliers.',
        'Our young, dynamic and qualified operation team to deliver impeccable service to the clients. This is what drives our organization to succeed and has drawn hundreds of prestigious customers to put immense trust and faith in our business.'
      ],
    },
    {
      tittle: 
        'VISION',
        content: [
          'Our company is having vision of expanding its presence very soon in the refinery segment with own brand named as AKSHAT GOLD PVT LTD. In order to serve you better and reach a wider network, we have focused to launch our outlets all over the region.'
        
      ],
    },
    {
      tittle: 'MANAGEMENT TEAM',
      content:[
        'Mayank Shah – Owner'
      ]
    }
  ];
 
}


