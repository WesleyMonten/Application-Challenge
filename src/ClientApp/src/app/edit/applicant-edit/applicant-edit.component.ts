import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Tag } from 'src/app/models/tag.model';

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
  tags: Tag[] = [
    { name: '.Net' },
    { name: 'Angular' },
    { name: 'Java' },
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
