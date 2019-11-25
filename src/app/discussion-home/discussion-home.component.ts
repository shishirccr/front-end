import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user";
import {Discussions} from "../../../models/discussions";
import {ActivatedRoute} from "@angular/router";
import {UserService} from '/Users/raja/Documents/GitHub/final/front-end/src/app/services/user.service';

@Component({
  selector: 'app-discussion-home',
  templateUrl: './discussion-home.component.html',
  styleUrls: ['./discussion-home.component.scss']
})
export class DiscussionHomeComponent implements OnInit {


  discussionList: Array<Discussions>;
  currentStudent: User;
  private studentId: string;
  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.currentStudent = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.studentId = params.get('id');
      }

      if(this.studentId || this.currentStudent|| true) {
        this.getAllDiscussions();
      }
    });
  }


  getAllDiscussions(){
    this.userService.getAllDiscussions().subscribe(data => {
      this.discussionList = data;
    });
  }

}
