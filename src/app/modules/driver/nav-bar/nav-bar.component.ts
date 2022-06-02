import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { User } from 'src/app/models/user.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { DriverService } from 'src/app/services/driver.service';
import { MessageService } from 'src/app/services/message.service';
import { StudentStatusService } from 'src/app/services/studentStatus.service';
import { interval, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private _currUser: CurrentUserService, private _router: Router, private messages: MessageService, private _driver: DriverService) { }
  currentDriver!: Driver;
  mesLen!: string;
  sideBar: boolean = false;
  directionsService = [] as any
  directionsRenderer = [] as any
  center!: google.maps.LatLngLiteral
  subscription!: Subscription;

  ngOnInit(): void {
    this._currUser.getDriver().subscribe(data => this.currentDriver = data)
    this._currUser.getDriver().subscribe(data => {
      this.messages.getMessageByDriverId(data.id).subscribe(data => { this.mesLen = (data.filter(m => m.isRead == false).length).toString() + '+' })
    })
  }
  sideBarFunc() {
    this.sideBar = !this.sideBar;
  }
  async startDriving() {
    Swal.fire({
      // title: '<strong style="font-size=2rem">lets go!!<strong>',
      imageUrl: '././././assets/go.png',
      imageWidth: 200,
      imageHeight: 200,
      confirmButtonColor:'#1689fc'

    }).then(res => {
      const source = interval(10000);
      this.subscription = source.subscribe(val => this.startDrivingAsync());
    })
  }
  async startDrivingAsync() {
    const getPos = await this.getCurrPosition()
    const updatePos = await this.updatePosition()
  }
  getCurrPosition() {

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    return this.center;

  }
  updatePosition() {
    this.currentDriver.currPositionX = this.center.lat;
    this.currentDriver.currPositionY = this.center.lng;
    this._driver.updateDriver(this.currentDriver).subscribe(res => console.log("put working!!!"))

    return this.currentDriver
  }

  navigate(num: number, d?: boolean) {
    switch (num) {
      case 1: this._router.navigate(['user/driver/routes', { direction: d }]); break;
      case 2: this._router.navigate(['user/driver/messages']); break;
      case 3: this._router.navigate(['user/driver/students']); break;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

