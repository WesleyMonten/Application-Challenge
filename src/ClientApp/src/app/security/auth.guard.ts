import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _accountService: AccountService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (localStorage.getItem('token')) {
      this._accountService.isLoggedIn.next(true);
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
