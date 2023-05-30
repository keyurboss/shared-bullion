import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

interface comments {
  tittle: string;
  content: string[];
}

@Component({
  selector: 'shiv-bull-app-about',
  standalone: true,
  imports: [NgFor],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  data: comments[] = [
    {
      tittle: 'WELCOME TO SHIV BULLION',
      content: [
        'Located in the beautiful city of Rajkot, SHIV BULLION is one of the biggest bullion dealers in the city. SHIV BULLION is also a direct importer of precious metals. It is a fast-growing organization with an excellent track record and reputation with suppliers all over the region and in the industry.      ',
      ],
    },
    {
      tittle: 'STRENGTH',
      content: [
        'We believe delivery on time and transparent trade policies have made it possible to achieve a prominent place in the industry over the years.',
        'We have been focusing mainly on purity and commitment. The company’s continuous desire to serve its customers in the best possible way makes it the best among the rest. We’ve developed immense customer faith and value through our excellent service and high-quality products. We strive hard for constant development to enhance our customer service, and the long-term bond that we share with our customers has helped us reach new heights.',
        'Our young, dynamic and qualified operation team delivers impeccable service to the clients. These factors drive our organization to succeed and have drawn hundreds of prestigious customers to put immense trust and faith in our business.',
      ],
    },
    {
      tittle: 'VISION',
      content: [
        'Our company has vision of expanding its presence very soon in the refinery segment with the brand name SHIV BULLION. In order to serve you better and reach a wider network, we have focused to launch our outlets all over the region.      ',
      ],
    },
    {
      tittle: 'MANAGEMENT TEAM',
      content: [
        'Jaydeep Bhai – (Founder & Owner)',
        'SHIV BULLION was founded by Jaydeep Bhai, who has been in this business for many years. The blend of his passion and experience in the Gold & Silver industry gave birth to the organization.          ',
      ],
    },
  ];
}
