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
stationCancel:number[]=new Array<number>();
routeCancel:number[]=new Array<number>();
countCancel:number[]=new Array<number>();
routeId:number=0;
stationId:number=0;
 ngOnInit(): void {
    this.curUser.getDriver().subscribe(data=>{this.driver=data,
      this.messages.getMessageByDriverId(this.driver.id).subscribe(data=>{this.messegesList=data,data.forEach((m ,i)=>this.family.getFamilyByUserId(m.userId).subscribe(d=>this.name[i]=d)),
        this.messegesList.forEach((m ,i)=>{this.messType[i]=MessageType[m.messageTypeId];
          if(m.messageTypeId==1){
            this.student.getStudentById(m.studentId).subscribe(data=>{
              this.routeCancel.push(data.routId)
              this.family.getFamilyById(data.familyId).subscribe(data=>{
                this.stationCancel.push(data.stationId)
                // console.log( this.routeCancel, this.stationCancel)
              })
            })
            
          }}),console.log(this.routeCancel, this.stationCancel)})})
  }
  isRead(mes:Message)
  {
  mes.isRead=!mes.isRead;
    this.messages.isRead(mes.id).subscribe();
  }

}
// if(this.routeCancel.find(r=>r==this.routeId)==this.stationCancel.find(s=>s==this.stationId)&&this.stationCancel.find(s=>s==this.stationId)!=-1){
//   this.countCancel[this.routeCancel.findIndex(r=>r==this.routeId)]==1;
//  }
//  else if(this.routeCancel.find(r=>r==this.routeId)==-1 && this.stationCancel.find(s=>s==this.stationId)==-1){
//    this.stationCancel.push(this.stationId),
//    this.routeCancel.push(this.routeId),
//    this.countCancel[this.routeCancel.findIndex(r=>r==this.routeId)]=1
//  }