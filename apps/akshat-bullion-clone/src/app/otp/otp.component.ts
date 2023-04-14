import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'akshat-bull-app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent {
  submitted = false;
  OtpForm = new FormGroup({
    input1: new FormControl('', [Validators.required]),
    input2: new FormControl('', [Validators.required]),
    input3: new FormControl('', [Validators.required]),
    input4: new FormControl('', [Validators.required]),
  });
  get input1() {
    return this.OtpForm.get('input1');
  }
  get input2() {
    return this.OtpForm.get('input2');
  }
  get input3() {
    return this.OtpForm.get('input3');
  }
  get input4() {
    return this.OtpForm.get('input4');
  }
  OnOtpuserSubmit() {
    this.submitted = true;
    if (
      this.input1.dirty &&
      this.input2.dirty &&
      this.input3.dirty &&
      this.input4.dirty
    ) {
      if (
        this.input1.value === '1' &&
        this.input2.value === '1' &&
        this.input3.value === '1' &&
        this.input4.value === '1'
      ) {
        Swal.fire('', 'sign up successful.....', 'success');
      } else {
        Swal.fire('Wrong Otp..!', '', 'warning');
      }
    } else {
      Swal.fire('Wrong Otp..!', '', 'warning');
    }
  }
  // nospace(event: any) {
  //   if (event.keyCode === 32) {
  //     event.preventDefault();
  //   }
  // }
  formatPhone(event: KeyboardEvent) {
    const input = event.key;
    if (input === 'Backspace') {
      return;
    }
    if (typeof input !== 'undefined' && isNaN(+input)) {
      event.preventDefault();
    }
  }

  jump(event: any, privious: any, current: any, next: any) {
      const length=current.value.length;
      const maxlength=current.getAttribute('maxlength');
      if (event.key =='Backspace') {
        console.log('Bakespace');
        if (privious != '') {
          privious.focus();
          console.log('privious.focus');
        }
      }
      if (length == maxlength) {
        console.log('length == maxlength');
        if (next != '') {
          console.log('next.focus');
          next.focus();
        }}
    }
  }

