import { Component, ViewEncapsulation,Inject,Input } from '@angular/core';
import { LiveRateService, RateObserDataType } from '@rps/buillion-frontend-core';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, NgFor, NgIf,CommonModule } from '@angular/common';

@Component({
  selector: 'rps-bull-rate-tables-5',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgFor, NgIf,CommonModule],
  encapsulation:ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-5.component.html',
  styleUrls: ['./rate-tables-5.component.scss'],
})
export class RateTables5Component {

  @Input() rate!:Observable<RateObserDataType>;
  @Input() Product_name = 'GOLD SPOT';
}
