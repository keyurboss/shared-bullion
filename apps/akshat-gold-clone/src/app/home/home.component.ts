import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { loginServices } from '../service/login.service';

@Component({
  selector: 'akshat-gold-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    NgStyle,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  menu = false;
  popup = false;

  constructor(public _testService: loginServices) {}

  popupfn1() {
    this.menu = true;
    this.popup = true;
  }
  popupfn2() {
    this.menu = false;
    this.popup = false;
  }
}
