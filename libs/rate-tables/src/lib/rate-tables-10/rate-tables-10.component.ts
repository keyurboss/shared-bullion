import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
interface table10{
  name:string;
  rate:string;
  imageLink:string;
  backgroundColor?:string;
}
@Component({
  selector: 'rps-bull-rate-tables-10',
  standalone: true,
  imports: [NgClass, NgFor, AsyncPipe, NgIf, JsonPipe],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-10.component.html',
  styleUrls: ['./rate-tables-10.component.scss'],
})
export class RateTables10Component {
  data :table10[]=[
    {
      name:"GOLD",
      imageLink:"https://akshatgold.com/assets/img/gold_bar_back.png",
      rate:"1997.50"
    },
    {
      name:"SILVER",
      imageLink:"https://akshatgold.com/assets/img/silver_bar_back.png",
      rate:"25.40"
    },
    {
      name:"INR",
      imageLink:"https://akshatgold.com/assets/img/rabi_logo.png",
      rate:"82.1600"
    }
  ]
}
