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
  submitted = false;
  LoginForm = new FormGroup({
    UserId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
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
  get RememberMe() {
    return this.LoginForm.get('RememberMe');
  }
  OnLoginuserSubmit() {
    this.submitted = true;
    console.log();
    if (this.UserId?.dirty === false || this.password?.dirty === false) {
      Swal.fire('All details are required!', 'Please fill out all fields!!', 'warning');
    } else {
      let found = false;
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === this.UserId?.value && this.users[i].password === this.password?.value) {
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
}
