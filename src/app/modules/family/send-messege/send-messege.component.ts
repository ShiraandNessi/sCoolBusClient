import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Driver } from 'src/app/models/driver.model';
import { Family } from 'src/app/models/family.model';
import { Message, MessageType } from 'src/app/models/message.model';
import { Student } from 'src/app/models/student.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { DriverService } from 'src/app/services/driver.service';
import { FamilyService } from 'src/app/services/family.service';
import { MessageService } from 'src/app/services/message.service';
import { RouteService } from 'src/app/services/route.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-send-messege',
  templateUrl: './send-messege.component.html',
  styleUrls: ['./send-messege.component.scss']
})
export class SendMessegeComponent implements OnInit {

  constructor(private _mess:MessageService, private family: FamilyService, private student: StudentService, private cuurUser: CurrentUserService, private route: RouteService, private driver: DriverService) { }
  currfamily!: Family;
  studentList: Student[] = new Array<Student>();
  driverList: Driver[] = new Array<Driver>();
  newMessege: Message = new Message();
  ngOnInit(): void {
    this.cuurUser.getFamily().subscribe(data => {
      this.currfamily = data,
        this.student.getStudentsByFamilyId(this.currfamily.id).subscribe(data => {
          this.studentList = data,   console.log("hhh",this.studentList),
            this.studentList.forEach((s, i) => {
            this.route.getRouteById(s.routId).subscribe(data => {
                this.driver.getDriverById(data.driverId).subscribe(data => {
                  this.driverList[i] = data
                })
              })
            })
        })
    })

  }

  messegeForm: FormGroup = new FormGroup({
    "messegeType": new FormControl("", Validators.required),
    "student": new FormControl("", Validators.required),
    "messageText": new FormControl("")
  });
  sendMessge() {
    console.log("lll",this.driverList,this.studentList)
    if (this.messegeForm.controls["messegeType"].value == 'other' || this.messegeForm.controls["messegeType"].value == 'question') {
      // console.log(Number(MessageType["other"]))
      this.newMessege.messageTypeId=Number(MessageType["other"]);
      this.newMessege.messageText=this.messegeForm.controls["messageText"].value
    }
    else{
      this.newMessege.messageTypeId=Number(MessageType["stationCancel"]);
    }
    let ind=this.studentList.findIndex(s=>s.firstName==this.messegeForm.controls["student"].value)
    this.newMessege.driverId=this.driverList[ind].id;
    this.newMessege.routId=this.studentList[ind].routId;
    this.newMessege.isRead=false;
    this.newMessege.studentId=this.studentList[ind].id;
    this.newMessege.userId=this.currfamily.userId
this._mess.addNewMessage(this.newMessege).subscribe(data=>{
  this.newMessege=data,
  console.log(this.newMessege)
})
window.location.reload();
  }


}
