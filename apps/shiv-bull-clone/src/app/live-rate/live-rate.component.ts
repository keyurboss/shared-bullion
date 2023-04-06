import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateTables1Component } from '@rps/bullion-rate-tables';

@Component({
  selector: 'shiv-bull-app-live-rate',
  standalone: true,
  imports: [CommonModule,RateTables1Component],
  templateUrl: './live-rate.component.html',
  styleUrls: ['./live-rate.component.scss'],
})
export class LiveRateComponent {}
