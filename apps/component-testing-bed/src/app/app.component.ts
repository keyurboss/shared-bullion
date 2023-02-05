import { Component } from '@angular/core';
import { RateTables1Component } from '@rps/bullion-rate-tables/table1';
@Component({
  standalone: true,
  imports: [RateTables1Component],
  selector: 'shared-bullion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'component-testing-bed';
}
