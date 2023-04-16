import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { UserDataService } from '../services/rememberData.service';
// import Swal from 'sweetalert2';
@Component({
  selector: 'akshat-bull-app-sign-up',
  standalone: true,
  imports: [CommonModule, NgIf, RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(private router: Router, public userData: UserDataService) { }
  show_Password = true;
  show_CPassword = true;
  submitted = false;
  SignForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    FirmName: new FormControl('', [Validators.required]),
    MobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      Validators.maxLength(10),
    ]),
    EmailId: new FormControl('', [Validators.required, Validators.email]),
    City: new FormControl('', [Validators.required]),
    Password: new FormControl('', [
      Validators.required,
    ]),
    ConfirmPassword: new FormControl(''),
    checkbox: new FormControl(false),
  });
  get Name() {
    return this.SignForm.get('Name');
  }
  get FirmName() {
    return this.SignForm.get('FirmName');
  }
  get MobileNumber() {
    return this.SignForm.get('MobileNumber');
  }
  get EmailId() {
    return this.SignForm.get('EmailId');
  }
  get City() {
    return this.SignForm.get('City');
  }
  get Password() {
    return this.SignForm.get('Password');
  }
  get ConfirmPassword() {
    return this.SignForm.get('ConfirmPassword');
  }
  get Signup() {
    return this.SignForm.get('Signup');
  }
  get checkbox() {
    return this.SignForm.get('checkbox');
  }
  get SignFormControl() {
    return this.SignForm.controls;
  }
  OnSignUpUserSubmit() {
    this.submitted = true;
    for (const key in this.SignForm.controls) {
      const iterator: FormControl = this.SignForm.controls[key];
      if (iterator.invalid) {
        console.log('iterator.invalid');
        Swal.fire('Error', `${key} Field is Compulsory!`, 'warning');
        if (iterator.dirty) {
          console.log('iterator.dirty');
          Swal.fire('Error', `Plese Enter valid ${key}`, 'warning');
        }
        break;
      }
      if (this.SignForm.valid) {
        if (this.Password.value.length < 8) {
          Swal.fire(
            'Error',
            'Plese Enter Min 8 Digit Long Password',
            'warning'
          );
        } else if (this.Password.value !== this.ConfirmPassword.value) {
          Swal.fire(
            'Error',
            'Password and Confirm Password are not same!',
            'warning'
          );
        } else if (this.checkbox.value === false) {
          Swal.fire(
            'Error',
            'You Have not checked the Terms & Conditions..',
            'warning'
          );
        } else {
          this.router.navigate(['/otp']);
        }
      }
    }
  }
  formatPhone(event: KeyboardEvent) {
    const input = event.key;
    if (input === 'Backspace') {
      return;
    }
    if ((typeof input !== 'undefined' && isNaN(+input)) && event.keyCode != 9) {
      event.preventDefault();
    }
  }
  startingspace(event: any) {
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.preventDefault();
    }
  }
  nospace(event: any) {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  }
}
