import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'akshat-bull-app-contact-us',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  images={
    location:'/assets/images/location.svg',
    Contact:'/assets/images/contact.svg',  
    Email:'/assets/images/mail.svg',
  }
  Address = {
    tittle: 'OFFICE ADDRESS',
    line1: 'Nr Pipala Sheri',
    line2: 'Main Bazar',
    line3: 'Balasinor, Mahisagar',
    line4: 'Gujarat,388255',
  };
  Contact = {
    tittle: 'Contact Numbers',
    line1: 'Personal',
    line2: 'Akshat Shah',
    line3: '+91 8320361328',
  };
  Email={
    tittle: 'Email',
    line1:'akshatshah185@gmail.com',
  };
}
