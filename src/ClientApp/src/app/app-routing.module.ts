import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FeedComponent } from './feed/feed/feed.component';
import { AccountDetailComponent } from './detail/account-detail/account-detail.component';
import { AccountEditComponent } from './edit/account-edit/account-edit.component';
import { AssignmentDetailComponent } from './detail/assignment-detail/assignment-detail.component';
import { AuthGuard } from './security/auth.guard';
import { BoardComponent } from './detail/board/board.component';
import { AssignmentBoardComponent } from './detail/assignment-board/assignment-board.component';

const appRoutes: Routes = [
  { path: '', component: FeedComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'board/:id', component: AssignmentBoardComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'account/:id', component: AccountDetailComponent, canActivate: [AuthGuard] },
  { path: 'edit-account/:id', component: AccountEditComponent, canActivate: [AuthGuard] },
  { path: 'assignments', component: AssignmentDetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
