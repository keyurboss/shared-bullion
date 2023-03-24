import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'akshat-bull-app-footer',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
footer_data={
  aboutus:'About Us ',
  aboutus_r_l:'home/about-us',
  message:'Messages',
  message_r_l:'home/messages',
  bank_d:'Bank Details',
  bank_d_r_l:'home/bank-details',
  contact_us:'Contact Us',
  contact_us_r_l:'home/contact-us',
  copyright_text:'Akshat Bullion © 2021 I All Rights Reserved',
};
}
