import { Component} from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
interface components {
  tittle: string;
  content: string[];
}
@Component({
  selector: 'akshat-bull-app-about-us',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutusComponent {
  images={
    background_logo:'/assets/images/Logo.svg',
  }; 
    data: components[] = [
    {
      tittle: `WELCOME TO Akshat Bullion`,
      content: [
        `Akshat Bullion was founded in 2018 by Akshat Shah who is doing business
      for many year. Blend of his passion and experience in the Gold
      & Silver industry have created the organization with customer
      oriented. It is located in the heart city of Ahmedabad.`,
        `Our young, dynamic and qualified operation team to deliver impeccable
    service to the clients. This is what drives our organization to succeed
    and has drawn hundreds of prestigious customers to put immense trust and
    faith in our business.`,
      ],
    },
    {
      tittle: `STRENGTH`,
      content: [
        `We believe delivery on time and transparent trade policies made possible
        to achieve the important place in the business within the short span of
        time. In the competitive arena Akshat Bullion obliged to satisfy its
        customer and suppliers.`,
        `Our young, dynamic and qualified operation team to deliver impeccable
        service to the clients. This is what drives our organization to succeed
        and has drawn hundreds of prestigious customers to put immense trust and
        faith in our business.`,
      ]
    },
    {
      tittle: `VISION`,
      content: [
        `Our company is having vision of expanding its presence very soon in the
        refinery segment with own brand named as Akshat Bullion. In order to
        serve you better and reach a wider network, we have focused to launch
        our outlets all over the region.`,
      ]
    },
    {
      tittle: `MANAGEMENT TEAM`,
      content: [
        `Akshat Shah – Owner`,
      ]
    },
  ];
}
