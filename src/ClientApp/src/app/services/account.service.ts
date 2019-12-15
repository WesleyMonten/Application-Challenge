import {Injectable} from '@angular/core';
import {Account} from '../models/account.model'
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Applicant} from '../models/applicant.model';
import {Skill} from '../models/skill.model';
import {Company} from '../models/company.model';
import {MatSidenav} from '@angular/material';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AccountService {

  isLoggedIn = new BehaviorSubject(false);
  refreshProfile = new BehaviorSubject(false);
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
