import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NavBar3Component } from '@rps/angular-nav-bars'
import { MAppComponent } from '../app/app.component';
import { CommonModule } from '@angular/common';
import { popupServices } from '../services/pop-upmenu.service';

// interface navigationBar {
//   router_link: string;
// }
// interface navbar3 extends navigationBar {
//   uid: string;
//   icon: {
//     url: string;
//     inactive_color: string;
//     active_color: string;
//   };
//   name: string;
//   indicator_color: string;
// }
@Component({
  selector: 'akshat-bull-app-about-us',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NavBar3Component, MAppComponent, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export default class HomeComponent {
  constructor(public _testService: popupServices) { }
  // active_uid = '4';
  // constructor(private routes: Router) { }
  // navbar: navbar3[] = [
  //   {
  //     name: 'Live Rate',
  //     uid: '1',
  //     router_link: 'app/home/live-rate',
  //     indicator_color: 'white',
  //     icon: {
  //       url: '../../assets/svg/nav_liverate_logo.svg',
  //       active_color: 'black',
  //       inactive_color: 'white',
  //     }
  //   },
  //   {
  //     name: 'Lagdi',
  //     uid: '2',
  //     router_link: 'app/home/lagdis',
  //     indicator_color: 'white',
  //     icon: {
  //       url: '../../assets/svg/nav_Lagdi_logo.svg',
  //       active_color: 'black',
  //       inactive_color: 'white',
  //     }
  //   },
  //   {
  //     name: 'Bank Details',
  //     uid: '3',
  //     router_link: 'app/home/bank-details',
  //     indicator_color: 'white',
  //     icon: {
  //       url: '../../assets/svg/nav_bank_logo.svg',
  //       active_color: 'black',
  //       inactive_color: 'white',
  //     }
  //   },
  //   {
  //     name: 'contact Us',
  //     uid: '4',
  //     router_link: 'app/home/contact-us',
  //     indicator_color: 'white',
  //     icon: {
  //       url: '../../assets/svg/nav_contact_logo.svg',
  //       active_color: 'black',
  //       inactive_color: 'white',
  //     }
  //   },
  //   {
  //     name: 'Login',
  //     uid: '5',
  //     router_link: '/login',
  //     indicator_color: 'white',
  //     icon: {
  //       url: '../../assets/svg/nav_login_logo.svg',
  //       active_color: 'black',
  //       inactive_color: 'white',
  //     }
  //   },
  // ]
  // OnChnageEvent(vlueEitted: string) {
  //   console.log(vlueEitted);
  //   this.active_uid = vlueEitted;
  //   const found = this.navbar.find(({ uid }) => uid === this.active_uid);
  //   if (found) {
  //     this.routes.navigateByUrl(`${found?.router_link}`);
  //     console.log(found?.router_link);
  //   }
  // }
  onActive() {
    window.scrollTo({
      top: 1,
      left: 0,
      behavior: "smooth",
    });
  }
} 