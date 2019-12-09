import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchStudentComponent } from './search-student/search-student.component';
import { SearchAssignmentComponent } from './search-assignment/search-assignment.component';
import { SearchCompanyComponent } from './search-company/search-company.component';

@NgModule({
  declarations: [SearchStudentComponent, SearchAssignmentComponent, SearchCompanyComponent],
  imports: [
    CommonModule
  ]
})
export class SearchModule { }
