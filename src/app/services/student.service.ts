import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { SaveFileService } from './save-file.service';

@Injectable()
export class StudentService {
  constructor(private _http: HttpClient) { }
  baseUrl: string = "/api/student/"

  getAllStudents(): Observable<Student[]> {
    return this._http.get<Student[]>(this.baseUrl);
  }
  getStudentById(id: number): Observable<Student> {
    return this._http.get<Student>(this.baseUrl + id);
  }
  getStudentsByFamilyId(familyId: number): Observable<Student[]> {
    return this._http.get<Student[]>(this.baseUrl + "family/" + familyId);
  }
  getStudentsByRouteId(routeId: number): Observable<Student[]> {
    return this._http.get<Student[]>(this.baseUrl + "route/" + routeId);
  }


  addNewStudent(newStudent: Student): Observable<any> {
    return this._http.post<Student>(this.baseUrl,newStudent);
  }
  saveStudentImage(file: any): Observable<boolean> {
    let formData = new FormData();
    formData.append('file', file, file.name);
    return this._http.put<boolean>(this.baseUrl+"/image", formData)
  }
  changeStudentDitails(newStudent: Student): Observable<any> {
    return this._http.put(this.baseUrl + newStudent.id, newStudent);
  }
  GetCountOfStudentsBystationId(routeId: number, stationId: number): Observable<number> {
    return this._http.get<number>(this.baseUrl + "count/" + stationId + "/" + routeId);
  }
  deleteStudent(studentId: number): Observable<any> {
    return this._http.delete(this.baseUrl + studentId)
  }
  
}
