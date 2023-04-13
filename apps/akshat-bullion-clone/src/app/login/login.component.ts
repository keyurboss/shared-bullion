import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { UserDataService } from '../services/rememberData.service';

@Component({
  selector: 'akshat-bull-app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(public userData: UserDataService) {}
  users = [
    { id: 'sahil', password: 'sahil' },
    { id: 'Sahil', password: 'sahil' },
    { id: 'harsh', password: 'harsh' },
    { id: 'Harsh', password: 'harsh' },
    { id: 'vraj', password: 'vraj' },
    { id: 'Vraj', password: 'vraj' },
    { id: 'bhavya', password: 'bhavya' },
    { id: 'Bhavya', password: 'bhavya' },
    { id: 'pratham', password: 'pratham' },
    { id: 'Pratham', password: 'pratham' },
    { id: 'alay', password: 'alay' },
    { id: 'Alay', password: 'alay' },
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

  OnLoginuserSubmit() {
    this.submitted = true;
    if (this.UserId.dirty === false || this.password.dirty === false) {
      Swal.fire(
        'All details are required!',
        'Please fill out all fields!!',
        'warning'
      );
    } else {
      let found = false;
      for (let i = 0; i < this.users.length; i++) {
        if (
          this.users[i].id === this.UserId.value &&
          this.users[i].password === this.password.value
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
