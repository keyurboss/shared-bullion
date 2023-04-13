import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  LoginUserId: string;
  LoginPassword: string;
  SignupUserName: string;
  SignupUserFirmName: string;
  SignupUserMobileNumber: string;
  SignupUserEmailid: string;
  SignupUserCity: string;
  SignupUserPassword: string;
  SignupUserCPassword: string;
}
