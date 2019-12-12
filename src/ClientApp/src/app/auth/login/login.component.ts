import {Component, OnInit} from '@angular/core';
import {UserLogin} from 'src/app/models/user-login.model';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: UserLogin = new UserLogin('', '');

  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit() {}

  onSubmit(){
    this._authService.login(this.model).subscribe((val) => {
      if (val.successful) {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate(['']);
      } else {
        alert(val.errorMessage); // TODO: proper
      }
    })
  }

}
