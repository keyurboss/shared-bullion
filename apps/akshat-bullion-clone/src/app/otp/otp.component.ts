import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDataService } from '../services/rememberData.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersDataService } from '../services/users-data.service';

@Component({
  selector: 'akshat-bull-app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent {
  Users: any;
  otp: string;
  generatedOTP: string;

  @Output() OTP = new EventEmitter<string[]>();
  constructor(
    private router: Router,
    public userData: UserDataService,
    private usersdata: UsersDataService
  ) {
    this.usersdata.users().subscribe((data) => {
      this.Users = data;
    });
  }
  otp_string: string[] = [];

  @ViewChild('otpParent') otpParent!: ElementRef<HTMLElement>;
  onKeyUpEvent(index: number, event: KeyboardEvent) {
    const inputElement = this.otpParent.nativeElement.children.item(
      index
    ) as unknown as HTMLInputElement;

    if (inputElement === null) {
      console.error('Element Not Found');
      return;
    }
    if (inputElement instanceof HTMLInputElement === false) {
      return;
    }
    if (event.key === 'Backspace') {
      if (inputElement.value === '' && index !== 0) {
        const previousElement = this.otpParent.nativeElement.children.item(
          index - 1
        );
        if (
          previousElement !== null &&
          previousElement instanceof HTMLInputElement
        ) {
          previousElement.focus();
          previousElement.select();
        }
      }
      this.otp_string[index] = '';
      inputElement.value = '';
      return;
    }
    if (
      (typeof event.key !== 'undefined' && isNaN(+event.key)) ||
      event.key === ' '
    ) {
      event.preventDefault();
      return;
    }
    if (event.key.length === 1) {
      if (inputElement.value === '') {
        inputElement.value = event.key;
        this.otp_string[index] = event.key;
      } else {
        this.otp_string[index] = inputElement.value;
      }
      if (index + 1 !== this.otpParent.nativeElement.childElementCount) {
        const nextElement = this.otpParent.nativeElement.children.item(
          index + 1
        );
        if (nextElement !== null && nextElement instanceof HTMLInputElement) {
          nextElement.focus();
          nextElement.select();
        }
      } else {
        this.otp =
          this.otp_string[0] +
          this.otp_string[1] +
          this.otp_string[2] +
          this.otp_string[3] +
          this.otp_string[4] +
          this.otp_string[5];
        inputElement.blur();
      }
    }
    if (index + 1 === this.otpParent.nativeElement.childElementCount) {
      this.OTP.emit(this.otp_string);
    }
  }
  NotNumber(event: KeyboardEvent) {
    const input = event.key;
    if (input === 'Backspace') {
      return;
    }
    if ((typeof input !== 'undefined' && isNaN(+input)) || input === ' ') {
      event.preventDefault();
    }
  }
  ReSendOTP() {
    this.generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    this.userData.otp = this.generatedOTP;
    Swal.fire(
      'NEW OTP',
      `${this.generatedOTP} is your one time password to signup Akshat Bullion.`,
      'info'
    );
  }
  change() {
    (this.userData.signup.SignupUserMobileNumber = ''),
      this.router.navigate(['/sign-up']);
  }
  usersubmitotp() {
    if (this.otp == this.userData.otp) {
      Swal.fire(
        'Congratulations!',
        'You have successfully signed up',
        'success'
      );
      this.router.navigate(['/login']);
      this.userData.userlogin = false;
      this.usersdata.saveusersdata(this.userData.sahil).subscribe();
    } else {
      Swal.fire('OTP is invalid', 'Please enter correct password', 'warning');
    }
  }
}
