import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {NewUser} from 'src/app/models/new-user.model';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  startDate = new Date(1990, 1, 1);
  model: NewUser = new NewUser('', '', '', new Date(Date.now()));
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private _authService: AuthService, private router: Router) { }

  ngOnInit() {}

  onSubmit() {
      this.submitted = true;
      this._authService.register(this.model).subscribe((val) => {
        if (val.successful) {
          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate(['']);
        } else {
          alert(val.errorMessage); // TODO: proper
        }
      })

    }
  }
