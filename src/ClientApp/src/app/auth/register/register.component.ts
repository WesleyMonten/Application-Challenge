import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NewUser } from 'src/app/models/new-user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { Company } from 'src/app/models/company.model';
import { Applicant } from 'src/app/models/applicant.model';
import { MatChipInputEvent } from '@angular/material';
import { Skill } from 'src/app/models/skill.model';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  company: Company = new Company('', '', '', '');
  applicant: Applicant = new Applicant('', true, []);
  model: NewUser = new NewUser('', '', '', new Date(Date.now()), null, null);
  submitted: boolean = false;
  selectedOption: boolean = true;
  options: string[] = ["Applicant", "Company"];
  skillAccount: Skill[] = [];
  skills: Skill[];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private formBuilder: FormBuilder, private _authService: AuthService, private router: Router,
    private _skillService : SkillService, private _location: Location) {
    this._skillService.get().subscribe(res => { this.skills = res; });
   }

  ngOnInit() { }

  onSubmit() {
    this.submitted = true;
    this.applicant.skills = this.skillAccount;
    if(this.selectedOption == true){
      this.model.applicant = this.applicant;
    }
    else{
      this.model.company = this.company;
    }
    console.log(this.model);
    this._authService.register(this.model).subscribe((val) => {
      if (val.successful) {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate(['']);
      } else {
        alert(val.errorMessage); // TODO: proper
      }
    })
  }

  onChange(value){
    this.selectedOption = value.value
  }

  addSkill(event: MatChipInputEvent): void {
    console.log(event);
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      var skill = this.skills.find(s => s.name.toLowerCase() == value.toLowerCase());
      if (skill != null) {
        this.skillAccount.push({ skillId: skill.skillId, name: skill.name, color: skill.color });
      } else {
        this.skillAccount.push({ skillId: "", name: value.trim(), color: '#007ACC' });
      }
      console.log(this.skillAccount);
    }
    if (input) {
      input.value = '';
    }
  }

  removeSkill(skill: Skill): void {
    const index = this.skillAccount.indexOf(skill);

    if (index >= 0) {
      this.skillAccount.splice(index, 1);
    }
  }

  goBack() {
    this._location.back();
  }
}
