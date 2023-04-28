/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  Email_id: string;
  loginInfo: any;
  password1: string;
  show_Password = true;
  constructor(private usersdata: loginServices, public router: Router) {}
  data = {
    router_link: '/home/live-rate',
  };
  submitted = false;
  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.email]),
    checkbox: new FormControl(false),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  get user() {
    return this.loginForm.get('user');
  }
  get checkbox() {
    return this.loginForm.get('checkbox');
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
          if (user.password1 === this.loginForm.controls.password.value) {
            Swal.fire('', 'successfully logged in', 'success');
            this.router.navigate(['/home/live-rate']);
            this.usersdata.newuser = true;
          } else {
            Swal.fire('', 'Incorrect password', 'warning');
          }
        } else {
          Swal.fire('', 'User Not Found', 'error');
        }
      });
    }

    //  const data= {Email_id:this.user.value ,pass:this.password.value};
    //  localStorage.setItem('loginInfo', JSON.stringify(data));

    // 1. and 2. where `items` is always an array of item-objects with 0..n elements
    if (this.checkbox.value === true) {
      const items = (() => {
        const fieldValue = localStorage.getItem('loginInfo');
        return fieldValue === null ? [] : JSON.parse(fieldValue);
      })();

      // 3.
      items.push({ Email_id: this.user.value, pass: this.password.value });

      // 4.
      localStorage.setItem('loginInfo', JSON.stringify(items));
    }
  }
  ngOnInit(): void {
    const recivedData = localStorage.getItem('loginInfo');
    this.loginInfo = JSON.parse(recivedData);
  
    if (this.usersdata.newuser === false) {
      return;
    } else {
      if (this.loginInfo) {
        this.router.navigate(['/home/live-rate']);
        Swal.fire({
          title: 'you are already logged in',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'New User',
          denyButtonText: `LogOut`,
        }).then((result) => {
          if (result.isConfirmed) {
            // Swal.fire('Saved!', '', 'success')
            this.router.navigate(['/login']);
            this.usersdata.newuser = false;
          } else if (result.isDenied) {
            Swal.fire('You are logged Out', '', 'info');
            this.usersdata.newuser = false;

            const delitems = (() => {
              const fieldValue = localStorage.getItem('loginInfo');
              return fieldValue === null ? [] : JSON.parse(fieldValue);
            })();
            delitems.pop();
            localStorage.setItem('loginInfo', JSON.stringify(delitems));
          }
        });
      }
    }
  }

  // }
}
