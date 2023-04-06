import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'shiv-bull-app-login',
  standalone: true,
  imports: [RouterModule, NgFor,NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  usersId = [
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
  data = {
    router_link: 'home/live-rate',
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

  // onPress(){
  //   this.submitted=true;
  //   let user1:string = this.user;
  //   console.log(user1, user1.length);
  //   let trimuser = user1.trim()
  //   console.log(trimuser, trimuser.length);

  // }

  onSubmitbtn() {
    this.submitted = true;
    if (this.user?.untouched && this.password?.untouched) {
      Swal.fire('', 'fill all details', 'error');
    } else if (this.user?.invalid) {
      Swal.fire('', 'enter valid user id', 'error');
    } else if (this.password?.invalid) {
      Swal.fire('', 'enter valid password', 'error');
    } else {
      let found = false;
      for (let i = 0; i < this.usersId.length; i++) {
        if (
          this.usersId[i].id === this.user?.value &&
          this.usersId[i].password === this.password?.value
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
      console.log(this.loginForm.value);
      const user1 = this.user?.value?.trim();
      console.log(user1);
      console.log(this.password?.value?.trim());
    }
  }

}
