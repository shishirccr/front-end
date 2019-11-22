import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';

let COURSE_API_URL = "http://localhost:8080/api/course/";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  currentUser: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
  }

  findAllModulesOfCourse(courseId: string): Observable<any> {
    return this.http.get(COURSE_API_URL + courseId + "/modules", {headers: this.headers});
  }

  getCourseById(courseId: string): Observable<any> {
    return this.http.get(COURSE_API_URL + courseId, {headers: this.headers});
  }

  getModuleById(moduleId: string): Observable<any> {
    return this.http.get(COURSE_API_URL + "modules/" + moduleId, {headers: this.headers});
  }

  findModuleContent(moduleId: string): Observable<any> {
    return this.http.get(COURSE_API_URL + "modules/" + moduleId + "/content", {headers: this.headers});
  }
}
