import { Injectable } from '@angular/core';
import { NewUser } from '../models/new-user.model';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../models/user-login.model';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  //Register
  register(user: NewUser) {
    return this.http.post<NewUser>("https://localhost:5001/auth/register", user);
  }

  //Login
  login(user: UserLogin) {
    return this.http.post<UserLogin>("https://localhost:5001/auth/login", user);
  }
}
