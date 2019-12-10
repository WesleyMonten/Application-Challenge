import { Injectable } from '@angular/core';
import { NewUser } from '../models/new-user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  //Login
  // authenticate(userLogin: UserLogin): Observable<User> {
  //   return this._httpClient.post<User>("http://localhost:56002/api/Gebruikers/authenticate", userLogin);
  // }

  //Register
  register(user: NewUser) {
    return this.http.post<NewUser>("", user);
  } 



}
