import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { Family } from 'src/app/models/family.model';
import { Student } from 'src/app/models/student.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { DriverService } from 'src/app/services/driver.service';
import { RouteService } from 'src/app/services/route.service';
import { StudentService } from 'src/app/services/student.service';
import { StudentStatusService } from 'src/app/services/studentStatus.service';

@Component({
  selector: 'app-nav-bar-family',
  templateUrl: './nav-bar-family.component.html',
  styleUrls: ['./nav-bar-family.component.scss']
})
export class NavBarFamilyComponent implements OnInit {

  constructor(private currUser: CurrentUserService, private student: StudentService, private routeSer: RouteService, private _router: Router, private _studentStatus: StudentStatusService, private driver: DriverService) { }
  sideBar: boolean = false;
  currentFamily!: Family;
  studentList: Student[] = new Array<Student>();
  driverList: Driver[] = new Array<Driver>();
  ngOnInit(): void {

    this.currUser.getFamily().subscribe(data => {
      this.currentFamily = data,
        this.student.getStudentsByFamilyId(this.currentFamily.id).subscribe(data => {
          this.studentList = data,
            this.studentList.forEach((s, i) => {
              this.routeSer.getRouteById(s.routId).subscribe(data => {
                this.driver.getDriverById(data.driverId).subscribe(data => {
                  this.driverList[i] = data,
                 this._studentStatus.sendEmail(s.id,this.driverList[i].id).subscribe(res=>alert("the mail sent!!!!"))
                })
              })
            })
        })
    })
  }
  sideBarFunc() {
    this.sideBar = !this.sideBar;
  }
  navigate(num: number) {
    switch (num) {
      // case 1: this._router.navigate(['user/driver/routes']); break;
      case 2: this._router.navigate(['user/family/sendMessages']); break;
      case 3: this._router.navigate(['user/family/familyHome']); break;
    }
  }
}