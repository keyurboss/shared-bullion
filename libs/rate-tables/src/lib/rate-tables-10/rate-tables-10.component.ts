import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rps-bull-rate-tables-10',
  standalone: true,
  imports: [NgClass, NgFor, AsyncPipe, NgIf, JsonPipe],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-10.component.html',
  styleUrls: ['./rate-tables-10.component.scss'],
})
export class RateTables10Component {}
