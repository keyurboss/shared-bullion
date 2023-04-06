import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'akshat-gold-login',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterOutlet,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  submitted = false;
  users = [
    { id: 'sahil@gmail.com', password: 'sahil' },
    { id: 'Sahil@gmail.com', password: 'sahil' },
    { id: 'harsh@gmail.com', password: 'harsh' },
    { id: 'Harsh@gmail.com', password: 'harsh' },
    { id: 'vraj@gmail.com', password: 'vraj' },
    { id: 'Vraj@gmail.com', password: 'vraj' },
    { id: 'bhavya@gmail.com', password: 'bhavya' },
    { id: 'Bhavya@gmail.com', password: 'bhavya' },
    { id: 'pratham@gmail.com', password: 'pratham' },
    { id: 'Pratham@gmail.com', password: 'pratham' },
    { id: 'alay@gmail.com', password: 'alay' },
    { id: 'Alay@gmail.com', password: 'alay' },
  ];
  LoginForm = new FormGroup({
    UserId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });
  get UserId() {
    return this.LoginForm.get('UserId');
  }
  get password() {
    return this.LoginForm.get('password');
  }
  get LoginFormControl() {
    return this.LoginForm.controls;
  }
  OnLoginuserSubmit() {
    this.submitted = true;
    if (this.UserId?.untouched || this.password?.untouched) {
      Swal.fire('', 'fill all details', 'error');
    } else if (this.UserId?.invalid) {
      Swal.fire('', 'enter valid user-id', 'error');
    } else if (this.password?.invalid) {
      Swal.fire('', 'enter valid password', 'error');
    } else {
      let found = false;
      for (let i = 0; i < this.users.length; i++) {
        if (
          this.users[i].id === this.UserId?.value &&
          this.users[i].password === this.password?.value
        ) {
          found = true;
          break;
        }
      }
      if (found) {
        Swal.fire('', 'Login successful', 'success');
      } else {
        Swal.fire('Error', 'User not found', 'error');
      }
      console.log(this.LoginForm.value);
    }
  }
  ForgotPassword() {
    Swal.fire(
      'Forgot Password?',
      'Please Contact Admin To Re-Set Password..!!',
      'info'
    );
  }
}
