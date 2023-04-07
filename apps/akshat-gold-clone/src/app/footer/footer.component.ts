import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'akshat-gold-clone-footer',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
footer_data={
  aboutus:'About Us ',
  aboutus_r_l:'home/about-us',
  message:'Updates',
  message_r_l:'home/updates',
  bank_d:'Bank Details',
  bank_d_r_l:'home/bank-details',
  contact_us:'Contact Us',
  contact_us_r_l:'home/contact-us',
  copyright_text:'Akshat Gold Pvt Ltd © 2018 I All Rights Reserved I Pratham Patel',
};
}