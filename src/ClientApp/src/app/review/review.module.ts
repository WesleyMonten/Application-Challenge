import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReviewComponent } from './add-review/add-review.component';
import { SharedModule } from '../shared/shared.module';
import { EditReviewComponent } from './edit-review/edit-review.component';
import {ChecklistModule} from "angular-checklist";

@NgModule({
  declarations: [AddReviewComponent, EditReviewComponent],
  imports: [
    CommonModule,
    SharedModule,
    ChecklistModule
  ]
})
export class ReviewModule { }
