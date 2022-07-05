import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl = "http://localhost:1205/"
  constructor(private http: HttpClient) { }
  getAllStudent() {
    return this.http.get(this.baseUrl + 'students');
  }
  getStudent(roll = 0) {
    return this.http.get(this.baseUrl + 'student/' + roll);
  }
  addStudent(data: any) {
    return this.http.post(this.baseUrl + 'student', data);
  }
  updateStudent(stud:any) {
    return this.http.put(this.baseUrl+"student",stud);
  }
  deleteStudent(roll=0)
  {
    return this.http.delete(this.baseUrl + 'student/' + roll);
  }
}
