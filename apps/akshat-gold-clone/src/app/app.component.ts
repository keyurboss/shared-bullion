import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';


@Component({
  standalone: true,
  imports: [ RouterModule,HeaderComponent,RouterOutlet],
  selector: 'akshat-gold-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'akshat-gold-clone';
}
