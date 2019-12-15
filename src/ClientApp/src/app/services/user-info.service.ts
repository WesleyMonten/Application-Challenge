import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserInfo } from "../models/user-info";

@Injectable()
export class UserInfoService {

  constructor(private http: HttpClient) { }

  get(accountID: string): Observable<UserInfo> {
    return this.http.get<UserInfo>("/userinfo/" + accountID);
  }
}
