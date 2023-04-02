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

@Component({
  selector: 'akshat-bull-app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
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
  get RememberMe() {
    return this.LoginForm.get('RememberMe');
  }
  OnLoginuserSubmit() {
    this.submitted = true;
    console.log();
    if (this.UserId.dirty === false || this.password.dirty === false) {
      Swal.fire('All details are required!', 'Please fill out all fields!!', 'warning');
    } else {
      let found = false;
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === this.UserId.value && this.users[i].password === this.password.value) {
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


