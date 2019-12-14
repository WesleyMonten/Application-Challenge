import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  showFiller = false;
  account: Account;

  constructor(private _accountService: AccountService) {
    // this._accountService.isLoggedIn.subscribe(e => {
    //   this.getAccount();
    // })
  }

  // getAccount() {
  //   this._accountService.get()
  // }

}
