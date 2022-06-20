import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as qs from 'qs';
import { Observable } from 'rxjs';
import { Family } from '../models/family.model';
import { UserSignIn } from '../models/user-sign-in.model';

@Injectable()
export class FamilyService {
baseUrl:string="api/Family/";
//familiesList!:Family[]
  constructor(private _http:HttpClient) { }
  // ngOnInit()
  // {
  //  this._http.get<Family[]>(this.baseUrl).subscribe(families=>this.familiesList=families);
  // }
  // getAllFamilies():Observable<Family[]>
  // {
  //   return this._http.get<Family[]>(this.baseUrl)
  // }
  getFamilyById(id:number):Observable<Family>
  {
     return this._http.get<Family>(this.baseUrl+id)
  }
  getFamilyByUserId(userId:number):Observable<Family>
  {
     return this._http.get<Family>(this.baseUrl+"user/"+userId)
  }
  addNewFamily(newFamily:Family):Observable<Family>{
   return this._http.post<Family>(this.baseUrl,newFamily)
  }
  updateFmaily(familyToUpdate:Family,newPassword:string):Observable<any>
  {
    let user:UserSignIn=new UserSignIn;
    user.newPassword=newPassword;
    user.email=familyToUpdate.email;
    user.password=familyToUpdate.password;
    const params = new HttpParams({fromString: qs.stringify(user)});
    return this._http.put<Family>(this.baseUrl+familyToUpdate.id,familyToUpdate,{params:params})
  }
}
