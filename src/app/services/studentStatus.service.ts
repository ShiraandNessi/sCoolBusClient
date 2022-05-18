import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable()
export class StudentStatusService {
  constructor(private _http : HttpClient) { }
  baseUrl : string = "/api/StudentStatus/"

  sendEmail(studetId:number, driverId:number):Observable <boolean>
  {
    return this._http.get<boolean>(this.baseUrl+studetId+"?driverId="+driverId);
  }
}