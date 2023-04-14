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
  constructor(private router: Router, public userData: UserDataService) {}
  show_Password=true;
  show_CPassword=true;
  submitted = false;
  SignForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    checkbox: new FormControl(false),
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
      Validators.minLength(8),
    ]),
    ConfirmPassword: new FormControl('', [Validators.required]),
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
    console.log('click');
    this.submitted = true;
    // this.Name.setValue(this.Name.value.trim());
    // this.FirmName.setValue(this.FirmName.value.trim());

    // if (this.EmailId.invalid) {
    //   Swal.fire('Error', 'Invalid Email!', 'warning');
    // } else if (this.MobileNumber.invalid) {
    //   Swal.fire('Error', 'Invalid MobileNumber!', 'warning');
    // } else if (this.Password.invalid) {
    //   Swal.fire('Error', 'please Enter Min 8 Digit Long Password', 'warning');
    // } else if (
    //   this.Name.dirty === false ||
    //   this.City.dirty === false ||
    //   this.FirmName.dirty === false
    // ) {
    //   Swal.fire('Error', 'All fields Are Compulsory!', 'warning');
    // } else if (this.Password.value !== this.ConfirmPassword.value) {
    //   Swal.fire(
    //     'Error',
    //     'Password and Confirm Password are not same!',
    //     'warning'
    //   );
    // } else if (this.SignForm.invalid) {
    //   Swal.fire('Error', 'All fields Are Compulsory!', 'warning');
    // } else if (this.checkbox.value === false) {
    //   Swal.fire(
    //     'Error',
    //     'You Have not checked the Terms & Conditions..',
    //     'warning'
    //   );
    // } else {
    //   this.router.navigate(['/otp']);

    for (const key in this.SignForm.controls) {
      const iterator: FormControl = this.SignForm.controls[key];
      if (iterator.invalid) {
        console.log(iterator);
        Swal.fire('Error', `${key} Are Compulsorytyyyyyyy!`, 'warning');
        if (iterator.dirty) {
          Swal.fire('Error', `${key} Plese Enter valid information`, 'warning');
        }
        break;
      }
      // let mask = "";
      // for (let i = 0; i <= sahil.length - 2; i++) {
      // mask += "X";
      // const xxnumber = mask + this.MobileNumber.value.slice(8, 10);
      // console.log(xxnumber);
      // }
    }
  }
  formatPhone(event: KeyboardEvent) {
    const input = event.key;
    if (input === 'Backspace') {
      return;
    }
    if (typeof input !== 'undefined' && isNaN(+input)) {
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
