import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  showFiller = false;

  constructor(private router: Router, private _accountService: AccountService) {
  }

  logout() {
    localStorage.removeItem("token");
    this._accountService.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
