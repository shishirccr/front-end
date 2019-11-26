import { Component, OnInit } from '@angular/core';
import {User} from 'app/models/user';
import {Discussions} from 'app/models/discussions';
// import {Comments} from "app/models/comments";
import {ActivatedRoute} from '@angular/router';
import {UserService} from 'app/services/user.service';
import {Comments} from '../models/comments';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {


  currentStudent: User;
  discussionContent: any;
  commentContent: any;
  currentDiscussion: Discussions;
  private discussionID: string;
  commentInput: string;


  constructor(private router: ActivatedRoute, private userService: UserService) {
    this.currentStudent = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      if(params.has('postId')){
        this.discussionID = params.get('postId');
      }

      if(this.discussionID || true) {
        this.getDiscussion();
        // alert(this.discussionID);
         this.getComments();
      }
    });
  }

  getDiscussion(){
    if(!this.discussionID){
      this.discussionID = this.currentStudent.id.toString();
    }
    this.userService.findByDiscussionID(this.discussionID).subscribe(data => {
      this.discussionContent = data;
    });
  }

  // submitComment(value: string) {
  //
  //   let comment = new Comments();
  //   comment.discussionID = this.discussionID;
  //   comment.userID = this.currentStudent.id;
  //   comment.timestamp = Date.now();
  //   comment.body = value;
  //   // discuss.body = this.comm;
  //   this.userService.submitComment(comment).subscribe(data => {
  //     // Do not remove next line. Error suppression
  //     // @ts-ignore
  //     this.router.navigate(['/discussionhome']);
  //   });
  // }


  private getComments() {
    this.userService.findCommentsByDiscussionID(this.discussionID).subscribe(data => {
      this.commentContent = data;
    });
  }


  private submitComment(value: string) {

    let comment = new Comments();
    comment.postId = this.discussionID;
    comment.userID = this.currentStudent.id;
    comment.timestamp = Date.now();
    comment.body = value;
    //console.log(comment.discussionID + '/' + comment.timestamp + '/' + comment.userID);
    // discuss.body = this.comm;
    this.userService.submitComment(comment).subscribe(data => {
      // Do not remove next line. Error suppression
      // @ts-ignore
      this.router.navigate(['']);
    });
  }
}
