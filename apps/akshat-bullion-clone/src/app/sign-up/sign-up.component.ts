import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'akshat-bull-app-sign-up',
  standalone: true,
  imports: [CommonModule, NgIf, RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  submitted = false;
  SignForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    check:new FormControl('',[Validators.required]),
    FirmName: new FormControl('', [Validators.required]),
    MobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
    EmailId: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),]),
    City: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(5)]),
    ConfirmPassword: new FormControl('', [Validators.required]),
  })
  // {
  //   validators: this.MustMatch('Password','ConfirmPassword')
  // });
  get Name() {
    return this.SignForm.get('Name');
  }
  get FirmName() {
    return this.SignForm.get('FirmName');
  }
  get MobileNumber() {
    return this.SignForm.get('MobileNumber');
  }
  get EmailId() {
    return this.SignForm.get('EmailId');
  }
  get City() {
    return this.SignForm.get('City');
  }
  get Password() {
    return this.SignForm.get('Password');
  }
  get ConfirmPassword() {
    return this.SignForm.get('ConfirmPassword');
  }
  get Signup() {
    return this.SignForm.get('Signup');
  }
  get SignFormControl() {
    return this.SignForm.controls;
  }
  get check() {
    return this.SignForm.controls;
  }
  OnSignUpUserSubmit() {
    this.submitted = true;
    if (this.SignForm.valid) {
      console.log(this.SignForm.value);
    }
  }
}














// export const ConfirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   const password = control.get('password');
//   const ConfirmPassword = control.get('confirmPassword');

//   return password && ConfirmPassword && password.value === ConfirmPassword.value ? { ConfirmPassword: true } : null;
// };

//  implements OnInit {
//   reactiveForm: FormGroup;
//   ngOnInit(){
//       this.reactiveForm=new FormGroup({
//           userid: new FormControl(null),
//           password: new FormControl(null),
//       });
//     }
//   }
