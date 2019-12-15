import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { SharedModule } from '../shared/shared.module';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    SharedModule,
    ClipboardModule
  ]
})
export class FeedModule { }
