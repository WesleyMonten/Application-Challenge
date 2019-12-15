import { Component } from '@angular/core';
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
  adminMode: boolean;

  constructor(private _accountService: AccountService) {
    if (localStorage.getItem("adminMode")) {
      this.adminMode = true;
    } else {
      this.adminMode = false;
    }
    // this._accountService.isLoggedIn.subscribe(e => {
    //   this.getAccount();
    // })
  }

  onChangeMode() {
    this.adminMode = !this.adminMode;
    if (this.adminMode) {
      localStorage.setItem("adminMode", "true");
    } else {
      localStorage.removeItem("adminMode");
    }
    this._accountService.refreshProfile.next(true);
  }

  // getAccount() {
  //   this._accountService.get()
  // }

}
