import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AssignmentEditComponent } from './assignment-edit/assignment-edit.component';

@NgModule({
  declarations: [AccountEditComponent, AssignmentEditComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EditModule { }
