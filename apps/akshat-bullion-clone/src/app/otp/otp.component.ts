import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { UserDataService } from '../services/rememberData.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'akshat-bull-app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent {
  @Output() OTP = new EventEmitter<string[]>();
  constructor(public userData: UserDataService) { }
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
    event.preventDefault();
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
    if ((typeof event.key !== 'undefined' && isNaN(+event.key)) || event.key === ' ') {
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
}

