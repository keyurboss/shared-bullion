import { JsonPipe, AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {
  LiveRateService,
  RateObserDataType,
} from '@rps/buillion-frontend-core/services/live-rate.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'rps-bull-rate-tables-10',
  standalone: true,
  imports: [NgClass, NgFor, AsyncPipe, NgIf, JsonPipe],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './rate-tables-10.component.html',
  styleUrls: ['./rate-tables-10.component.scss'],
})
export class RateTables10Component {}
