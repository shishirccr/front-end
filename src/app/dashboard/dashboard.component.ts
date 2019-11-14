import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Course} from '../models/course';
import {CourseStudent} from '../models/coursestudent';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  studentId: string;
  currentStudent: User;
  courseList: Array<Course>;
  allCourses: Array<Course>;
  errorMessage: string;
  infoMessage: string;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.currentStudent = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.studentId = params.get('id');
      }

      if(this.studentId || this.currentStudent) {
        this.findAllCoursesOfStudent();
      }
    });
  }

  findAllCoursesOfStudent(){
    if(!this.studentId){
      this.studentId = this.currentStudent.id.toString();
    }
    this.userService.findAllCoursesOfStudent(this.studentId).subscribe(data => {
      this.courseList = data;
      this.findAllCourses(data);
    });
  }

  findAllCourses(enrolledCourse) {
    this.userService.findAllCourses().subscribe(data => {
      this.allCourses = data;
      const courseIds = enrolledCourse.map(course => {
        return course.id
      });
      const temp = this.allCourses.filter(course => !courseIds.includes(course.id));
      this.allCourses = temp;
      console.log(temp);
    });
  }

  enrollStudent(course) {
    if(!this.currentStudent){
      this.errorMessage = "You should sign in to enroll a course";
      return;
    }
    const courseStudent = new CourseStudent();
    courseStudent.student = this.currentStudent;
    courseStudent.course = course;

    this.userService.enroll(courseStudent).subscribe(data => {
      this.infoMessage = "Enrollment is completed.";
      this.courseList = null;
      this.allCourses = null;
      if(this.studentId || this.currentStudent) {
        this.findAllCoursesOfStudent();
      }
    }, err => {
      this.errorMessage = "Unexpected error occured.";
    });
  }

  unEnrollStudent(course) {
    if(!this.currentStudent){
      this.errorMessage = "You should sign in to enroll a course";
      return;
    }
    const courseStudent = new CourseStudent();
    courseStudent.student = this.currentStudent;
    courseStudent.course = course;

    this.userService.deEnroll(courseStudent).subscribe(data => {
      this.infoMessage = "De-enrollment is completed.";
      this.courseList = null;
      this.allCourses = null;
      if(this.studentId || this.currentStudent) {
        this.findAllCoursesOfStudent();
      }
    }, err => {
      this.errorMessage = "Unexpected error occured.";
    });
  }
}
