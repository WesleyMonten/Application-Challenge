import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/models/user-login.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: UserLogin = new UserLogin('', '');

  constructor(private _authService: AuthService, private router: Router, private _accountService: AccountService) { }

  ngOnInit() { }

  onSubmit() {
    this._authService.login(this.model).subscribe((val) => {
      if (val.successful) {
        // noinspection JSIgnoredPromiseFromCall
        this._accountService.isLoggedIn.next(true);
        this.router.navigate(['']);
      } else {
        alert(val.errorMessage); // TODO: proper
      }
    })
  }

}
