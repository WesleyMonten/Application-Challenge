import { Component, OnInit } from '@angular/core';
import { AssignmentTopic } from 'src/app/models/assignment-topic.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AssignmentService } from 'src/app/services/assignment.service';
import { MatChipInputEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from 'src/app/models/assignment.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.scss']
})
export class AssignmentEditComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  assignment: Assignment;
  topics: AssignmentTopic[];
  assignmentTopics: AssignmentTopic[];
  minDate: any = Date.now;
  maxDate: any;
  isInternship: boolean = false;

  editAssignmentForm: FormGroup;

  constructor(private _assignmentService: AssignmentService, private fb: FormBuilder, private route: ActivatedRoute, private _location: Location) { }

  goBack() {
    this._location.back();
  }

  getIdFromParameter() {
    this.route.params.subscribe(params => {
      var id = params['id'];
      this.getAssignment(id);
    })
  }

  getAssignment(assignmentId: string) {
    this._assignmentService.getAssignment(assignmentId).subscribe(res => {
      this.assignment = res;
      this.assignmentTopics = res.topics;

      this.editAssignmentForm = this.fb.group({
        Title: [this.assignment.title, Validators.required],
        Description: [this.assignment.description, Validators.required],
        Location: [this.assignment.location, Validators.required],
        StartTime: [this.assignment.startTime, Validators.required],
        EndTime: [this.assignment.endTime, Validators.required],
        Compensation: [{ value: this.assignment.compensation, disabled: this.isInternship }, [Validators.required, Validators.min(0)]],
        isInternship: [this.assignment.isInternship]
      });

    });
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

  onSubmitEditAssignment() {
    this.editAssignmentForm.addControl('AssignmentTopics', new FormControl(this.assignmentTopics));
    this._assignmentService.put(this.editAssignmentForm.value).subscribe(res => {
      console.log(res);
    })
  }

  ngOnInit() {
    this.getIdFromParameter();
    this._assignmentService.getAllAssignmentTopics().subscribe(res => {
      this.topics = res;
    });
  }

}
