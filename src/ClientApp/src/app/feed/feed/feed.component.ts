import { Component, OnInit } from '@angular/core';
import {ApplicationService} from "../../services/application.service";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  liked: boolean = false;
  liked2: boolean = false;
  expanded: boolean = false;

  constructor(){}

  toggleLike() {
    this.liked = this.liked != true;
  }

  toggleLike2() {
    this.liked2 = this.liked2 != true;
  }

  toggleExpand() {
    this.expanded = this.expanded != true
  }

  ngOnInit() {
  }

}
