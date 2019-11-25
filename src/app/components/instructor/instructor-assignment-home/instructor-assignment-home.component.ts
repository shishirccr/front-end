import { Component, OnInit } from '@angular/core';
import {Module} from '../../../models/modules';
import {User} from '../../../models/user';
import {Assignment} from '../../../models/assignment';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../../services/course.service';
import {AssignmentService} from '../../../services/assignment.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-instructor-assignment-home',
  templateUrl: './instructor-assignment-home.component.html',
  styleUrls: ['./instructor-assignment-home.component.scss']
})
export class InstructorAssignmentHomeComponent implements OnInit {
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

  getCurrentAssignment() {
    this.assignmentService.getAssignmentById(this.assignmentId).subscribe(assignment => {
      this.currentAssignment = assignment;
    });
  }

  editAssignment() {

  }

  uploadAssignmentFile() {


  }

  fileChange(event) {

  }
}
