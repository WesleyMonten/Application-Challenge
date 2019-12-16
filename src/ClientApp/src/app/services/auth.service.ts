import {Injectable} from '@angular/core';
import {NewUser} from '../models/new-user.model';
import {HttpClient} from '@angular/common/http';
import {UserLogin} from '../models/user-login.model';
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {SuccessWrapper} from "../models/success-wrapper.model";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: NewUser): Observable<SuccessWrapper<string>> {
    return this.http.post<SuccessWrapper<string>>("/auth/register", user).pipe(map(AuthService.setTokenIfAny));
  }

  login(user: UserLogin): Observable<SuccessWrapper<string>> {
    return this.http.post<SuccessWrapper<string>>("/auth/login", user).pipe(map(AuthService.setTokenIfAny));
  }

  private static setTokenIfAny(val: SuccessWrapper<string>): SuccessWrapper<string> {
    if (val.successful) {
      localStorage.setItem("token", val.result);
    }

    return val;
  }
}
