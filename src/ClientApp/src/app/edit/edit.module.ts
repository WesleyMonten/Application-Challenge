import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AccountEditComponent } from './account-edit/account-edit.component';

@NgModule({
  declarations: [AccountEditComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EditModule { }
