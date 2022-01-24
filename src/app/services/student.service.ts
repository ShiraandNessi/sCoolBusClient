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
  getStudentById(id:string):Observable<Student>
  {
    return this._http.get<Student>(this.baseUrl+id);
  }
  getStudentsByFamilyId(familyId: string):Observable <Student[]>
  {
    return this._http.get<Student[]>(this.baseUrl+"byFamily/" + familyId);
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
