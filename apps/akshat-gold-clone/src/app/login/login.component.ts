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
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'akshat-gold-login',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterOutlet,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  submitted = false;
 
  
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
      // this.usersdata.users().subscribe((sahil: any[]) => {
      //   const user = sahil.find(
      //     (user) => user.email === this.loginForm.controls.user.value
      //   );
      //   if (user) {
      //     if (user.pass === this.loginForm.controls.password.value) {
      //       Swal.fire('', 'successfully logged in', 'success');
      //       this.router.navigate(['/home/live-rate']);
      //     } else {
      //       Swal.fire('', 'Incorrect password', 'warning');
      //     }
      //   } else {
      //     Swal.fire('', 'User Not Found', 'error');
      //   }
      // });
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
