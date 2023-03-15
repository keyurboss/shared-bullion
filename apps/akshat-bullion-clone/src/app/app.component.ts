import { Component } from '@angular/core';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';

@Component({
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  selector: 'Akshat-bull-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'akshat-bullion-clone';
}

