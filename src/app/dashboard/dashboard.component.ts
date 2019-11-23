import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Course} from '../models/course';
import {CourseStudent} from '../models/coursestudent';
import {Role} from '../models/role';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userId: string;
  currentUser: User;
  courseList: Array<Course>;
  allCourses: Array<Course>;
  errorMessage: string;
  infoMessage: string;
  isInstructor = false;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser && this.currentUser.role === Role.TEACHER) {
      this.isInstructor = true;
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.userId = params.get('id');
      }

      if(this.userId || this.currentUser) {
        this.findAllCoursesOfUser();
      }
    });
  }

  findAllCoursesOfUser(){
    if(!this.userId){
      this.userId = this.currentUser.id.toString();
    }
    if (this.isInstructor) {
      this.userService.findAllCoursesOfTeacher(this.userId).subscribe(data => {
        this.courseList = data;
      });
    } else {
      this.userService.findAllCoursesOfStudent(this.userId).subscribe(data => {
        this.courseList = data;
        this.findAllCourses(data);
      });
    }
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
    if(!this.currentUser){
      this.errorMessage = "You should sign in to enroll a course";
      return;
    }
    const courseStudent = new CourseStudent();
    courseStudent.student = this.currentUser;
    courseStudent.course = course;

    this.userService.enroll(courseStudent).subscribe(data => {
      this.infoMessage = "Enrollment is completed.";
      this.courseList = null;
      this.allCourses = null;
      if(this.userId || this.currentUser) {
        this.findAllCoursesOfUser();
      }
    }, err => {
      this.errorMessage = "Unexpected error occured.";
    });
  }

  unEnrollStudent(course) {
    if(!this.currentUser){
      this.errorMessage = "You should sign in to enroll a course";
      return;
    }
    const courseStudent = new CourseStudent();
    courseStudent.student = this.currentUser;
    courseStudent.course = course;

    this.userService.deEnroll(courseStudent).subscribe(data => {
      this.infoMessage = "De-enrollment is completed.";
      this.courseList = null;
      this.allCourses = null;
      if(this.userId || this.currentUser) {
        this.findAllCoursesOfUser();
      }
    }, err => {
      this.errorMessage = "Unexpected error occured.";
    });
  }
}
