import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NavBar1Component, navbar1 } from '@rps/angular-nav-bars'


@Component({
  selector: 'akshat-bull-app-about-us',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NavBar1Component],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  images: navbar1[] = [
    {
      icon: {
        url: '../../assets/images/home-outline.svg',
        active_color: 'white',
        inactive_color: 'red'
      },
      uid: '1',
      name: 'home',
      indicator_color: 'red'
    },
    {
      icon: {
        url: '../../assets/images/home-outline.svg',
        active_color: 'white',
        inactive_color: 'red'
      },
      uid: '2',
      name: 'home',
      indicator_color: 'red'
    }
  ]
}
