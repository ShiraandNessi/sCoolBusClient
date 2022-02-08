import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  getFamilyById(id:string):Observable<Family>
  {
     return this._http.get<Family>(this.baseUrl+id)
  }
  addNewFamily(newFamily:Family):Observable<Family>{
   return this._http.post<Family>(this.baseUrl,newFamily)
  }
  updateFmaily(familyToUpdate:Family,newPassword:string):Observable<any>
  {
    let user:UserSignIn=new UserSignIn;
    user.newPassword=newPassword;
    return this._http.put<Family>(this.baseUrl+familyToUpdate.id+"/?userDetails="+newPassword,familyToUpdate)
  }
}
