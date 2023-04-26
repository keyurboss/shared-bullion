import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import Swal from 'sweetalert2';
import { loginServices } from '../services/login.service';

@Component({
  selector: 'shiv-bull-app-login',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  Email_id: string;
  passwordd: string;
  show_Password = true;
  constructor(private usersdata: loginServices, public router: Router) {}
  data = {
    router_link: '/home/live-rate',
  };
  submitted = false;
  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  loginUser() {
    console.warn(this.loginForm.value);
  }

  get user() {
    return this.loginForm.get('user');
  }
  get password() {
    return this.loginForm.get('password');
  }
  onSubmitbtn() {
    this.submitted = true;
    if (this.user?.untouched && this.password?.untouched) {
      Swal.fire('', 'fill all details', 'error');
    } else if (this.user?.invalid) {
      Swal.fire('', 'enter valid user id', 'error');
    } else if (this.password?.invalid) {
      Swal.fire('', 'enter valid password', 'error');
    } else {
      this.usersdata.users().subscribe((sahil: any[]) => {
        const user = sahil.find(
          (user) => user.Email_id === this.loginForm.controls.user.value
        );
        if (user) {
          if (user.passwordd === this.loginForm.controls.password.value) {
            Swal.fire('', 'successfully logged in', 'success');
            this.router.navigate(['/home/live-rate']);
          } else {
            Swal.fire('', 'Incorrect password', 'warning');
          }
        } else {
          Swal.fire('', 'User Not Found', 'error');
        }
      });
    }
    console.log(this.password?.value?.trim());
  }
}
