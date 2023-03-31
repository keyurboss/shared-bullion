import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NavBar3Component, navbar3 } from '@rps/angular-nav-bars'
import { MAppComponent } from '../app/app.component';

@Component({
  selector: 'akshat-bull-app-about-us',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NavBar3Component,MAppComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  images: navbar3[] = [
    {
      name: 'Live Rate',
      uid: '1',
      indicator_color: 'white',
      icon: {
        url: '../../assets/svg/nav_liverate_logo.svg',
        active_color: 'black',
        inactive_color: 'white',
      }
    },
    {
      name: 'Lagdi',
      uid: '2',
      indicator_color: 'white',
      icon: {
        url: '../../assets/svg/nav_Lagdi_logo.svg',
        active_color: 'black',
        inactive_color: 'white',
      }
    },
    {
      name: 'Bank Details',
      uid: '3',
      indicator_color: 'white',
      icon: {
        url: '../../assets/svg/nav_bank_logo.svg',
        active_color: 'black',
        inactive_color: 'white',
      }
    },
    {
      name: 'contact Us',
      uid: '4',
      indicator_color: 'white',
      icon: {
        url: '../../assets/svg/nav_contact_logo.svg',
        active_color: 'black',
        inactive_color: 'white',
      }
    },
    {
      name: 'Login',
      uid: '5',
      indicator_color: 'white',
      icon: {
        url: '../../assets/svg/nav_login_logo.svg',
        active_color: 'black',
        inactive_color: 'white',
      }
    },
  ]
}
