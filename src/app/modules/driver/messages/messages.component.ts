import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import { Message, MessageType } from 'src/app/models/message.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { MessageService } from 'src/app/services/message.service';
import { PrimeIcons } from "primeng/api";
import { FamilyService } from 'src/app/services/family.service';
import { Family } from 'src/app/models/family.model';
import { Station } from 'src/app/models/station.model';
import { StudentService } from 'src/app/services/student.service';
@Component({
  selector: 'app-meesages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private messages:MessageService,private curUser:CurrentUserService,private family:FamilyService,private student:StudentService) { }
 messegesList!:Message[];
 name:Family[]= new Array<Family>();
 messType:string[]=new Array<string>();
 driver!:Driver;
// countCancelStation = new Map<(number,number), number>()


 
  ngOnInit(): void {
    this.curUser.getDriver().subscribe(data=>{this.driver=data,
      this.messages.getMessageByDriverId(this.driver.id).subscribe(data=>{this.messegesList=data,data.forEach((m ,i)=>this.family.getFamilyByUserId(m.userId).subscribe(d=>this.name[i]=d)),
        this.messegesList.forEach((m ,i)=>{this.messType[i]=MessageType[m.messageTypeId];
          if(m.messageTypeId==0){
            this.student.getStudentById(m.studentId).subscribe(data=>{
              this.family.getFamilyById(data.familyId).subscribe(data=>{
                // this.countCancelStation.set(data.stationId,1)
              })
            })
            
          }}),console.log(this.messType)})})
  }
  isRead(mesId:number)
  {
    this.messages.isRead(mesId).subscribe();
  }

}
