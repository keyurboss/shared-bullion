import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterOutlet],
  selector: 'shiv-bull-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
})
export class AppComponent {
  title = 'shiv-bull-clone';
}
