import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Skill } from 'src/app/models/skill.model';

@Component({
  selector: 'app-applicant-edit',
  templateUrl: './applicant-edit.component.html',
  styleUrls: ['./applicant-edit.component.scss']
})

export class ApplicantEditComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Skill[] = [
    { skillID: "1", name: '.Net', color: '' },
    { skillID: "2", name: 'Angular', color: '' },
    { skillID: "3", name: 'Java', color: '' },
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({ skillID: "4", name: value.trim(), color: '' });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Skill): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
