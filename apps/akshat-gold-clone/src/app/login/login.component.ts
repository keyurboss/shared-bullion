import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import Swal from 'sweetalert2';

@Component({
  selector: 'akshat-gold-login',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
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
  // OnLoginuserSubmit() {
  //   this.submitted = true;
  //   if (this.UserId?.dirty === false || this.password?.dirty === false) {
  //     Swal.fire(
  //       'All details are required!',
  //       'Please fill out all fields!!',
  //       'warning'
  //     );
  //   } else {
  //     console.log(this.LoginForm.value);
  //     Swal.fire('Error', 'User Not Fonund', 'error');
  //   }
  // }
}
