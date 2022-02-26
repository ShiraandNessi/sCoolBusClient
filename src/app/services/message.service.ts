import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { CurrentUserService } from './current-user.service';

@Injectable()
export class MessageService {

baseUrl:string="/api/Messege/"
  constructor(private _http:HttpClient,private curUser:CurrentUserService) { }

userToken= this.curUser.currUser.token;
headers= new HttpHeaders()
  .set( 'Authorization', 'Bearer ' + 'userToken')

  getMessageByDriverId(id:number):Observable<Message[]>
  {
    return this._http.get<Message[]>(this.baseUrl+id,{ 'headers': this.headers });
  }

  addNewMessage(newMess:Message):Observable<Message>
  {
    return this._http.post<Message>(this.baseUrl,newMess);
  }
  isRead(id:number)
  {
    return this._http.get<Message>(this.baseUrl+id+'/read');
  }

}
