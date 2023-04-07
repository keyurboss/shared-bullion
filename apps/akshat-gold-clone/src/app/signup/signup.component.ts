import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'akshat-gold-signup',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  submitted = false;
  SignForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    checkbox: new FormControl(false),
    MobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      Validators.maxLength(10),
    ]),
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    CompneyName: new FormControl('', [Validators.required]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    ConfirmPassword: new FormControl('', [Validators.required]),
  });
  get Name() {
    return this.SignForm.get('Name');
  }
  get Email() {
    return this.SignForm.get('Email');
  }
  get MobileNumber() {
    return this.SignForm.get('MobileNumbr');
  }
  get CompneyName() {
    return this.SignForm.get('CompneyName');
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
    return this.SignForm.get('SognFormcontrol');
  }
  OnSignUpUserSubmit() {
    this.submitted = true;
    if (this.SignForm?.untouched) {
      Swal.fire('', 'All Fields Required', 'warning');
    } else if (this.Email?.invalid) {
      Swal.fire('Error', 'Invalid Email', 'warning');
    } else if (this.MobileNumber?.invalid) {
      Swal.fire('Error', 'Invalid MobileNumber', 'warning');
    } else if (this.Password?.invalid) {
      Swal.fire('Error', 'please enter min 4 digit Password', 'warning');
    } else if (this.Name?.dirty === false || this.CompneyName?.dirty === false) {
      Swal.fire('Error', 'Please Fill All Field', 'warning');
    } else if (this.Password?.value !== this.ConfirmPassword?.value) {
      Swal.fire(
        'Error',
        'Password and Confirm Password are not same!',
        'warning'
      );
    } else if (this.checkbox?.value === false) {
      Swal.fire(
        'Error',
        'You Have not checked the Terms & Conditions..',
        'warning'
      );
    } else {
      console.log(this.SignForm.value);
      Swal.fire('Success', 'successfully submitted check console', 'success');
    }
  }
}
