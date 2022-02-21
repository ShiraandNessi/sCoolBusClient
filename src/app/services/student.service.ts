import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable()
export class StudentService {
  constructor(private _http : HttpClient) { }
  baseUrl : string = "/api/student/"

  getAllStudents():Observable <Student[]>
  {
    return this._http.get<Student[]>(this.baseUrl);
  }
  getStudentById(id:number):Observable<Student>
  {
    return this._http.get<Student>(this.baseUrl+id);
  }
  getStudentsByFamilyId(familyId: number):Observable <Student[]>
  {
    return this._http.get<Student[]>(this.baseUrl+"family/" + familyId);
  }
  getStudentsByRouteId(routeId: number):Observable <Student[]>
  {
    return this._http.get<Student[]>(this.baseUrl+"route/" + routeId);
  }

  AddNewStudent(newStudent : Student):Observable<Student>
  {
    return this._http.post<Student>(this.baseUrl,newStudent);
  }

  changeStudentDitails(newStudent: Student):Observable <any>
  {
    return this._http.put(this.baseUrl+newStudent.id , newStudent);
  }
}
