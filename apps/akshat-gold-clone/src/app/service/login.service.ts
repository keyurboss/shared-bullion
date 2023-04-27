import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class loginServices {
  url = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {}
  users() {
    return this.http.get('http://localhost:3000/user')
  }
}