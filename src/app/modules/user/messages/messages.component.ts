import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import { Message, MessageType } from 'src/app/models/message.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { MessageService } from 'src/app/services/message.service';
import { PrimeIcons } from "primeng/api";
import { FamilyService } from 'src/app/services/family.service';
import { Family } from 'src/app/models/family.model';
@Component({
  selector: 'app-meesages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private messages:MessageService,private curUser:CurrentUserService,private family:FamilyService) { }
 messegesList!:Message[];
 name:Family[]= new Array<Family>();
 messType:string[]=new Array<string>();
 driver!:Driver;
 mesLen!:number
 
  ngOnInit(): void {
    this.curUser.getDriver().subscribe(data=>{this.driver=data,
      this.messages.getMessageByDriverId(this.driver.id).subscribe(data=>{this.messegesList=data,data.forEach((m ,i)=>this.family.getFamilyByUserId(m.userId).subscribe(d=>this.name[i]=d)),console.log(this.name),this.mesLen=data.length}),
      this.messegesList.forEach((m ,i)=>this.messType[i]=MessageType[m.messageTypeId]),console.log(this.messType)})
  }

}
