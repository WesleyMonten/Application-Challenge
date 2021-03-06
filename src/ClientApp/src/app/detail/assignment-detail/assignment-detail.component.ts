import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';
import { AssignmentTopic } from 'src/app/models/assignment-topic.model';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AccountService } from "../../services/account.service";
import { Assignment } from "../../models/assignment.model";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.scss']
})
export class AssignmentDetailComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  topics: AssignmentTopic[];
  assignmentTopics: AssignmentTopic[] = [];
  minDate: any = Date.now;
  maxDate: any;
  isInternship: boolean = false;

  companyId: string = '';

  newAssignmentForm = this.fb.group({
    Title: ['', Validators.required],
    Description: ['', Validators.required],
    Location: ['', Validators.required],
    StartTime: ['', Validators.required],
    EndTime: ['', Validators.required],
    Compensation: [0, [Validators.required, Validators.min(0)]],
    isInternship: [this.isInternship]
  });

  constructor(private _assignmentService: AssignmentService, private fb: FormBuilder, private _accountService: AccountService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    const date = new Date();
    this.maxDate = date.setDate(this.minDate + 2);
    this._assignmentService.getAllAssignmentTopics().subscribe(res => {
      this.topics = res;
    });
    this._accountService.get("me").subscribe(user => {
      return this.companyId = user.id;
    })
  }

  addTopic(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      var topic = this.topics.find(a => a.name.toLowerCase() == value.toLowerCase());
      if (topic != null) {
        this.assignmentTopics.push({ assignmentTopicId: topic.assignmentTopicId, name: topic.name, color: topic.color });
      } else {
        this.assignmentTopics.push({ assignmentTopicId: "", name: value.trim(), color: '#007ACC' });
      }
    }
    if (input) {
      input.value = '';
    }
  }

  removeTopic(topic: AssignmentTopic): void {
    const index = this.assignmentTopics.indexOf(topic);

    if (index >= 0) {
      this.assignmentTopics.splice(index, 1);
    }
  }

  onChangeInternship() {
    this.isInternship = this.isInternship != true;
  }

  onSubmitNewAssignment() {
    this.newAssignmentForm.addControl('AssignmentTopics', new FormControl(this.assignmentTopics));
    let value = <Assignment>this.newAssignmentForm.value;
    value.companyId = this.companyId;
    value.topics = this.assignmentTopics;
    value.isInternship = this.isInternship
    this._assignmentService.create(value).subscribe(res => {
      console.log(res);
      this._snackBar.open("Assignment Created!", "", {
        duration: 2000,
        panelClass: ['snackbar']
      });
      this._assignmentService.refreshBoard.next(true);
      this.newAssignmentForm.reset();
      Object.keys(this.newAssignmentForm.controls).forEach(key => {
        this.newAssignmentForm.get(key).setErrors(null);
      });
    });
  }

}
