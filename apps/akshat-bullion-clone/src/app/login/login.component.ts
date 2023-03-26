import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'akshat-bull-app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
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
  Loginuser() {
    console.warn(this.LoginForm.value);
  }
}


