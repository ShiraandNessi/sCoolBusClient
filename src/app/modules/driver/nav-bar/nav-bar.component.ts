import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { User } from 'src/app/models/user.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private _currUser: CurrentUserService, private _router: Router, private messages: MessageService) { }
  currentDriver!: Driver;
  mesLen!: string;
  sideBar: boolean = false;
  ngOnInit(): void {
    this._currUser.getDriver().subscribe(data => this.currentDriver = data)
    this._currUser.getDriver().subscribe(data => {
      this.messages.getMessageByDriverId(data.id).subscribe(data => { this.mesLen = (data.filter(m => m.isRead == false).length).toString() + '+' })
    })
    runPosition()
  }
  sideBarFunc(){
    this.sideBar=!this.sideBar;
  }
  navigate(num: number, d?: boolean) {
    switch (num) {
      case 1: this._router.navigate(['user/driver/routes', { direction: d }]); break;
      case 2: this._router.navigate(['user/driver/messages']); break;
      case 3: this._router.navigate(['user/driver/students']); break;
    }
  }
}

