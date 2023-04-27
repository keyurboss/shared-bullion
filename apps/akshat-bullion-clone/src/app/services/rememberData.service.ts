import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  login = {
    LoginUserId: '',
  }
  userlogin = false
  signup = {
    SignupUserName: '',
    SignupUserFirmName: '',
    SignupUserMobileNumber: '',
    SignupUserEmailid: '',
    SignupUserCity: '',
    SignupUserPassword: '',
    SignupUserCPassword: '',
    Terms_Conditions: null,
  }
  otp = ''
  sahil = {
    Name: '',
    FirmName: '',
    MobileNumber: '',
    EmailId: '',
    City: '',
    Password: '',
  }
}
