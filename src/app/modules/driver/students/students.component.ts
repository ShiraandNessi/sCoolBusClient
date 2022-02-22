import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import { Student } from 'src/app/models/student.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { RouteService } from 'src/app/services/route.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  constructor(private students:StudentService,private curUser:CurrentUserService,private route:RouteService) { }
studentsList!:Student[];
 driver!:Driver;
 mesLen!:number
  ngOnInit(): void {
    this.curUser.getDriver().subscribe(data=>{this.driver=data,
      this.route.getRouteByDriverId(this.driver.id).subscribe(data=>{this.students.getStudentsByRouteId(data.id).subscribe(data=>{this.studentsList=data})})})
  }


}
