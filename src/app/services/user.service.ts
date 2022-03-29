import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSignIn } from '../models/user-sign-in.model';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  baseUrl="/api/user/";
   _isLogIn!:boolean;
  constructor(private _http:HttpClient) {
   this._isLogIn=false;
   }

  getUserById(email:string,password:string):Observable<User>
  {
    let user:UserSignIn=new UserSignIn;
    user.email=email;
    user.password=password;
    return this._http.post<User>("/api/user/",user); 
  }
  isLogIn()
  {
     this._isLogIn=true;
  }
}
