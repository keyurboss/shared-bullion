import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  // url = 'http://localhost:3000/usersdata';
  constructor(private http: HttpClient) { }
  users() {
    return this.http.get('http://localhost:3000/usersdata')
  }
  saveusersdata(data) {
    return this.http.post('http://localhost:3000/usersdata', data)
  }
}
