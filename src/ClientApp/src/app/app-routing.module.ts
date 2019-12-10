import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed/feed.component';
import { ApplicantDetailComponent } from './detail/applicant-detail/applicant-detail.component';

const appRoutes: Routes = [
  { path: '', component: FeedComponent, pathMatch: 'full' },
  { path: 'applicant', component: ApplicantDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
