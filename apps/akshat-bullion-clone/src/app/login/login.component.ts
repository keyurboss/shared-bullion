import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { UserDataService } from '../services/rememberData.service';
import { UsersDataService } from '../services/users-data.service';
import { contains } from 'class-validator';

@Component({
  selector: 'akshat-bull-app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  Name: string;
  Password: string;
  loginInfo: any;
  constructor(
    private router: Router,
    public userData: UserDataService,
    private usersdata: UsersDataService
  ) {}
  show_Password = true;
  submitted = false;
  LoginForm = new FormGroup({
    UserId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    checkbox: new FormControl(false),
  });
  get UserId() {
    return this.LoginForm.get('UserId');
  }
  get password() {
    return this.LoginForm.get('password');
  }
  get checkbox() {
    return this.LoginForm.get('checkbox');
  }
  get LoginFormControl() {
    return this.LoginForm.controls;
  }
  OnLoginuserSubmit() {
    this.submitted = true;
    if (this.UserId.touched === false || this.password.touched === false) {
      Swal.fire(
        'All details are required!',
        'Please fill out all fields!!',
        'warning'
      );
    } else {
      if (this.UserId.value.includes('@') === true) {
        this.usersdata.users().subscribe((sahil: any[]) => {
          const user = sahil.find((user) => user.EmailId === this.UserId.value);
          if (user) {
            if (user.Password === this.password.value) {
              this.router.navigate(['app/home/live-rate']);
              Swal.fire('', 'successfully logged in', 'success');
              this.userData.userlogin = true;
              this.userData.newuser = true;
              if (this.checkbox.value === true) {
                const items = (() => {
                  const fieldValue = localStorage.getItem('loginInfo');
                  return fieldValue === null ? [] : JSON.parse(fieldValue);
                })();

                items.push({
                  Email_id: this.UserId.value,
                  pass: this.password.value,
                });

                localStorage.setItem('loginInfo', JSON.stringify(items));
              }
            } else {
              Swal.fire('', 'Incorrect password', 'warning');
            }
          } else {
            Swal.fire('', 'User Not Found', 'error');
          }
        });
      } else {
        this.usersdata.users().subscribe((sahil: any[]) => {
          const user = sahil.find(
            (user) => user.MobileNumber === this.UserId.value
          );
          if (user) {
            if (user.Password === this.password.value) {
              this.router.navigate(['app/home/live-rate']);
              Swal.fire('', 'successfully logged in', 'success');
              this.userData.userlogin = true;
              this.userData.newuser = true;
              if (this.checkbox.value === true) {
                const items = (() => {
                  const fieldValue = localStorage.getItem('loginInfo');
                  return fieldValue === null ? [] : JSON.parse(fieldValue);
                })();

                items.push({
                  MobileNumber: this.UserId.value,
                  pass: this.password.value,
                });

                localStorage.setItem('loginInfo', JSON.stringify(items));
              }
            } else {
              Swal.fire('', 'Incorrect password', 'warning');
            }
          } else {
            Swal.fire('', 'User Not Found', 'error');
          }
        });
      }
    }
  }
  ngOnInit(): void {
    const recivedData = localStorage.getItem('loginInfo');
    this.loginInfo = JSON.parse(recivedData);
    if (this.userData.newuser === false) {
      return;
    } else {
      if (this.loginInfo) {
        this.router.navigate(['/app/home/live-rate']);
        Swal.fire({
          title: 'you are already logged in',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'New User',
          denyButtonText: `LogOut`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
            this.userData.newuser = false;
          } else if (result.isDenied) {
            Swal.fire('You are logged Out', '', 'info');
            this.userData.newuser = false;
            this.userData.userlogin = false;
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
