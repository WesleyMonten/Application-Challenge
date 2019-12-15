import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReviewComponent } from './add-review/add-review.component';
import { SharedModule } from '../shared/shared.module';
import { EditReviewComponent } from './edit-review/edit-review.component';
import { MatCheckboxModule } from '@angular/material';

@NgModule({
  declarations: [AddReviewComponent, EditReviewComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatCheckboxModule
  ]
})
export class ReviewModule { }
