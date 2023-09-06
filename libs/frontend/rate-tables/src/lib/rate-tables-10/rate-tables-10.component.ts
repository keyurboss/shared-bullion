import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
interface table10 {
  name: string;
  rate: string;
  imageLink: string;
  backgroundColor?: string;
}
@Component({
  selector: 'rps-bull-rate-tables-10',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgFor, AsyncPipe, NgIf, JsonPipe],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-10.component.html',
  styleUrls: ['./rate-tables-10.component.scss'],
})
export class RateTables10Component {
  data: table10[] = [];
}
