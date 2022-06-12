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

  AddImageToStudent(newStudent: Student): Observable<Student> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    var formData = new FormData();
    this.buildFormData(formData, newStudent.image, 'myArray');
 
    return this._http.put<Student>(this.baseUrl,formData,{ headers: headers });
  }

  addNewStudent(newStudent: Student): Observable<any> {
    return this._http.post<Student>(this.baseUrl,newStudent);
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
  buildFormData(formData: FormData, data: any, parentKey: any) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        var keyString = "";
        if (parentKey) {
          var curData = data[key as keyof object]
          if (data instanceof Array) {
            if (typeof curData === 'object' && !(curData instanceof Date) && !(curData instanceof File))
              keyString = `${parentKey}[${key}]`;
            else
              keyString = `${parentKey}`;
          }
          else
            keyString = `${parentKey}.${key}`
        }
        else
          keyString = key;
        this.buildFormData(formData, data[key as keyof object], keyString);
      });
    } else {
      const value = data == null ? '' : (data instanceof Date ? data.toUTCString() : (data instanceof File ? data : data.toString()));
      formData.append(parentKey, value);
    }
  }
}
