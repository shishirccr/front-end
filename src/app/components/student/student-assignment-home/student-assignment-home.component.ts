import { Component, OnInit } from '@angular/core';
import {Assignment} from '../../../models/assignment';
import {User} from '../../../models/user';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../../services/course.service';
import {AssignmentService} from '../../../services/assignment.service';

@Component({
  selector: 'app-student-assignment-home',
  templateUrl: './student-assignment-home.component.html',
  styleUrls: ['./student-assignment-home.component.scss']
})
export class StudentAssignmentHomeComponent implements OnInit {
  assignmentId: string;
  currentAssignment: Assignment;
  currentUser: User;

  constructor(private route: ActivatedRoute, private courseService: CourseService, private assignmentService: AssignmentService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('assignmentId')){
        this.assignmentId = params.get('assignmentId');
      }
      if(this.assignmentId || this.currentUser) {
        this.getCurrentAssignment();
      }
    });
  }


  fileChange(event) {

  }

  submitAssignment() {


  }

  getCurrentAssignment() {
    this.assignmentService.getAssignmentById(this.assignmentId).subscribe(assignment => {
      this.currentAssignment = assignment;
    });
  }

}
