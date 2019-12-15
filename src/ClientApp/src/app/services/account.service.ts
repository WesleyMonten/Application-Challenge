import { Injectable } from '@angular/core';
import { Account } from '../models/account.model'
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AccountService {

  isLoggedIn = new BehaviorSubject(false);
  refreshProfile = new BehaviorSubject(false);
  refreshNav = new BehaviorSubject(false);
  dateString = '1968-11-16T00:00:00';
  date = new Date(this.dateString);

  constructor(private http: HttpClient) { }

  get(accountId: string): Observable<Account> {
    return this.http.get<Account>("/accountinfo/" + accountId);
  }

  put(account: Account): Observable<Account> {
    return this.http.put<Account>("/accountinfo/" + account.accountId, account);
  }

  delete(accountId: string): Observable<boolean> {
    return this.http.delete<boolean>("/accountinfo/" + accountId);
  }

  putStatus(account): Observable<Account> {
    return of(account);
  }
}
