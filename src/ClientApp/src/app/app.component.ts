import { Component, ViewChild } from '@angular/core';
import { AccountService } from './services/account.service';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  showFiller = false;
  isLoggedIn: boolean;
  public static API_URL = "https://localhost:5001";

  @ViewChild('drawer', { static: false }) drawer: MatDrawer;

  constructor(private _accountService: AccountService, private router: Router) {
    this._accountService.isLoggedIn.subscribe(e => {
      console.log(e);
      this.isLoggedIn = e;
    });
  }

  logout() {
    localStorage.removeItem("token");
    this._accountService.isLoggedIn.next(false);
    this.drawer.toggle();
    this.router.navigate(['/login']);
  }
}
