import { Component } from '@angular/core';
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


@Component({
  selector: 'akshat-bull-app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  Name: string;
  Password: string;
  constructor(private router: Router, public userData: UserDataService, private usersdata: UsersDataService) { }
  show_Password = true;
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
      this.usersdata.users().subscribe((sahil: any[]) => {
        const user = sahil.find((user) => user.Name === this.UserId.value);
        if (user) {
          if (user.Password === this.password.value) {
            this.router.navigate(['app/home/live-rate'])
            Swal.fire(
              '',
              'successfully logged in',
              'success'
            );
            this.userData.userlogin = true;
          } else {
            Swal.fire(
              '',
              'Incorrect password',
              'warning'
            );
          }
        } else {
          Swal.fire(
            '',
            'User Not Found',
            'error'
          );
        }
      })
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
