import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { Message } from 'src/app/models/message.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.scss']
})
export class DriverHomeComponent implements OnInit {


  constructor(private _router:Router,private currUser: CurrentUserService,private msg: MessageService) {
    this.temp().then(x=>{console.log(x)
      this.msg.getMessageByDriverId(x.id) .subscribe(data=>this.messagesList=data)
     //  console.log(this.messagesList)
     //  this.countMessages=this.messagesList.length
 })
   }

  ngOnInit(): void {
  
  }
  temp():Promise<Driver>
  {
    this.currUser.getDriver().subscribe(data=>{this.currDriver=data,console.log("aaa",this.currDriver)})
    return Promise.resolve(this.currDriver)

  }
  messagesList!:Message[]
  countMessages!:number
  currDriver:Driver=new Driver()
navigation(num:number){
  switch(num)
  {
  case 1: this._router.navigate(['user/driver/routes']) ;break;
  case 2: this._router.navigate(['user/driver/messages']) ;break;
  case 3:this._router.navigate(['user/driver/students']) ;break;
  }
}

}
