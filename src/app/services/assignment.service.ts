import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CourseStudent} from '../models/coursestudent';
import {Assignment} from '../models/assignment';

const ASSIGNMENT_API_URL = "http://localhost:8080/api/assignment/";

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  currentUser: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
  }

  getAssignmentById(assignementId: string): Observable<any> {
    return this.http.get(ASSIGNMENT_API_URL + assignementId, {headers: this.headers});
  }

  findAllAssignmentOfModule(moduleId: string): Observable<any> {
    return this.http.get("http://localhost:8080/api/course/modules/" + moduleId + "/assignments", {headers: this.headers});
  }

  submitAssignment (assignment: Assignment): Observable<any> {
    return this.http.post(ASSIGNMENT_API_URL + "add", JSON.stringify(assignment), {headers: this.headers});
  }
}
