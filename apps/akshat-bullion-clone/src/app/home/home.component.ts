import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
// import { NavBar1Component } from '@rps/angular-nav-bars/nav-bar-1';
// import { NavBar2Component } from '@rps/angular-nav-bars/nav-bar-2';

@Component({
  selector: 'akshat-bull-app-about-us',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
