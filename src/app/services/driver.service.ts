import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Driver } from '../models/driver.model';
import { UserSignIn } from '../models/user-sign-in.model';

@Injectable()
export class DriverService {
  baseUrl: string = "/api/Driver/";
  // baseList!:Driver[];
  constructor(private _http: HttpClient) {
}
  // ngOnInit()
  // {
  //    this._http.get<Driver[]>(this.baseUrl).subscribe(data=>this.baseList=data);
  // }
  getAllDrivers():Observable<Driver[]> {
    return this._http.get<Driver[]>(this.baseUrl)
  }

  getDriverById(id: string):Observable<Driver> {
    return this._http.get<Driver>(this.baseUrl+id)
  }
  addNewDriver(newDriver: Driver):Observable<Driver> { 
    return this._http.post<Driver>(this.baseUrl, newDriver);
  }
  updateDriver(driverToUpdate:Driver,newPassword:string):Observable<any>
  {
    let user:UserSignIn=new UserSignIn;
    user.newPassword=newPassword;
    return this._http.put<Driver>(this.baseUrl+driverToUpdate.id+"/?userDetails="+newPassword,driverToUpdate);
  }


  
}