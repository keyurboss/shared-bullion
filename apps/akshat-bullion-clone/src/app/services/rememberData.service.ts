import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  login = {
    LoginUserId: '',
    LoginPassword: '',
  }

  signup = {
    SignupUserName: '',
    SignupUserFirmName: '',
    SignupUserMobileNumber: '',
    SignupUserEmailid: '',
    SignupUserCity: '',
    SignupUserPassword: '',
    SignupUserCPassword: '',
  }
  otp = ''
}
