import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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


  constructor(private _router:Router,private curUser: CurrentUserService,private messages: MessageService) {
  
   }

  ngOnInit(): void {
    this.curUser.getDriver().subscribe(data=>{this.driver=data,console.log("fff",data),
      this.messages.getMessageByDriverId(this.driver.id).subscribe(data=>{this.mesLen=(data.length).toString(),console.log("ooo",data.length)})})
  }

 
mesLen!:string;
  driver!:Driver;
  isRouteClicked!:boolean;
routeClicked()
{
  this.isRouteClicked= true;
}
navigation(num:number){
  switch(num)
  {
  case 1: this._router.navigate(['user/driver/routes']) ;break;
  case 2: this._router.navigate(['user/driver/messages']) ;this.mesLen="0";break;
  case 3:this._router.navigate(['user/driver/students']) ;break;
  }
}

}
