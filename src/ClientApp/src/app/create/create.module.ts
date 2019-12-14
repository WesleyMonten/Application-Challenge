import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyCreateComponent } from './company-create/company-create.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CompanyCreateComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CreateModule { }
