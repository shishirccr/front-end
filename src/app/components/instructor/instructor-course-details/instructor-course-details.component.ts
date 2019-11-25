import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../../services/course.service';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../../models/user';
import {Assignment} from '../../../models/assignment';
import {AssignmentService} from '../../../services/assignment.service';
import {Module} from '../../../models/modules';
import swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-instructor-course-details',
  templateUrl: './instructor-course-details.component.html',
  styleUrls: ['./instructor-course-details.component.scss']
})
export class InstructorCourseDetailsComponent implements OnInit {

  moduleId: string;
  currentModule: Module;
  currentUser: User;
  assignment: Assignment = new Assignment();
  assignments: Array<Assignment>;

  constructor(private route: ActivatedRoute, private courseService: CourseService, private assignmentService: AssignmentService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('moduleId')){
        this.moduleId = params.get('moduleId');
      }
      if(this.moduleId || this.currentUser) {
        this.getAllAssignments();
        this.getCurrentModule();
      }
    });
  }

  getCurrentModule() {
    this.courseService.getModuleById(this.moduleId).subscribe(module => {
      this.currentModule = module;
    });
  }

  addNewAssignment() {
    this.assignment.module = this.currentModule;
    console.log(this.assignment);
    swal({
      title: 'Are you sure you want to add this assignment?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then(() => {
      this.assignmentService.submitAssignment(this.assignment).subscribe((assignments) => {
        swal({
          title: 'Success',
          text: 'Assignment Added!',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(() => {
          this.getAllAssignments();
          this.assignment.name = "";
          this.assignment.description = "";
          this.assignment.endDate = null;
          this.assignment.startDate = null;
        })
      });
    }, function (dismiss) {
      if (dismiss === 'cancel') {
      }
    })
  }

  getAllAssignments(){
    this.assignmentService.findAllAssignmentOfModule(this.moduleId).subscribe(assignments => {
      this.assignments = assignments;
    });
  }
}
