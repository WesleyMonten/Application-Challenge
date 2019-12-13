import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountDeleteComponent } from '../delete/account-delete/account-delete.component';
import { AssignmentBoardComponent } from './assignment-board/assignment-board.component';

@NgModule({
  declarations: [AssignmentDetailComponent, ReviewDetailComponent, AccountDetailComponent, AssignmentBoardComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
  ],
  entryComponents: [AccountDeleteComponent],
  providers: [DatePipe]
})
export class DetailModule { }
