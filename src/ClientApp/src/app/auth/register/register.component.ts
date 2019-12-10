import { Component, OnInit } from '@angular/core';
import { MustMatch } from '../../_helpers/must-match.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewUser } from 'src/app/models/new-user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  startDate = new Date(1990, 1, 1);
  registerForm: FormGroup;
  model: NewUser = new NewUser('', '', '', new Date(Date.now()));
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {}

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      

    }
  }