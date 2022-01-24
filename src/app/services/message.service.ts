import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {

baseUrl:string="/api/Messege/"
  constructor(private _http:HttpClient) { }

  // getAllMesseges():Observable<Message>
  // {
  //   return this._http.get<Message>(this.baseUrl);
  // }
  getMessageByDriverId(id:number):Observable<Message>
  {
    return this._http.get<Message>(this.baseUrl+id);
  }
  addNewMessage(newMess:Message):Observable<Message>
  {
    return this._http.post<Message>(this.baseUrl,newMess);
  }


}
