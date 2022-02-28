import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import { Family } from 'src/app/models/family.model';
import { Student } from 'src/app/models/student.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { DriverService } from 'src/app/services/driver.service';
import { FamilyService } from 'src/app/services/family.service';
import { RouteService } from 'src/app/services/route.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-family-home',
  templateUrl: './family-home.component.html',
  styleUrls: ['./family-home.component.scss']
})
export class FamilyHomeComponent implements OnInit {

  constructor(private family:FamilyService,private student:StudentService,private cuurUser:CurrentUserService,private route:RouteService,private driver:DriverService) { }
currfamily!:Family;
studentList:Student[]=new Array<Student>();
driverList:Driver[]=new Array<Driver>();
  ngOnInit(): void {
    this.cuurUser.getFamily().subscribe(data=>{
      this.currfamily=data,
      this.student.getStudentsByFamilyId(this.currfamily.id).subscribe(data=>{
        this.studentList=data,
        this.studentList.forEach((s,i)=>{ console.log(s,s.routId),this.route.getRouteById(s.routId).subscribe(data=>{
          this.driver.getDriverById(data.driverId).subscribe(data=>{
            this.driverList[i]=data
          })
        })})
      })
    })
    
  }

}


