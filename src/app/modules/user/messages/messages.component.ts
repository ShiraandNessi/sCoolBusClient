import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import { Message } from 'src/app/models/message.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-meesages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private messages:MessageService,private curUser:CurrentUserService) { }
 messegesList!:Message[];
 driver!:Driver;
  ngOnInit(): void {
    this.curUser.getDriver().subscribe(data=>{this.driver=data,
      this.messages.getMessageByDriverId(this.driver.id).subscribe(data=>this.messegesList=data)})
  }

}
