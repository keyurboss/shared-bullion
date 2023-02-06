import { Component } from '@angular/core';
import { RateTables2Component } from '@rps/bullion-rate-tables';
import { RateTables1Component } from '@rps/bullion-rate-tables/table1';
@Component({
  standalone: true,
  imports: [RateTables1Component ,RateTables2Component],
  selector: 'shared-bullion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'component-testing-bed';
}
