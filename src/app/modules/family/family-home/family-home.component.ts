import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Driver } from 'src/app/models/driver.model';
import { Family } from 'src/app/models/family.model';
import { Route } from 'src/app/models/route.model';
import { Student } from 'src/app/models/student.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { DriverService } from 'src/app/services/driver.service';
import { FamilyService } from 'src/app/services/family.service';
import { RouteService } from 'src/app/services/route.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { StudentDetailsComponent } from '../student-details/student-details.component';

@Component({
  selector: 'app-family-home',
  templateUrl: './family-home.component.html',
  styleUrls: ['./family-home.component.scss']
})
export class FamilyHomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private routeSer: RouteService, private family: FamilyService, private student: StudentService, private cuurUser: CurrentUserService, private route: RouteService, private driver: DriverService) { }
  currfamily!: Family;
  studentList: Student[] = new Array<Student>();
  driverList: Driver[] = new Array<Driver>();
  routeList: Route[] = new Array<Route>();
  emptyList: boolean = false;
  ngOnInit(): void {
    this.cuurUser.getFamily().subscribe(data => {
      this.currfamily = data,
        this.student.getStudentsByFamilyId(this.currfamily.id).subscribe(data => {
          this.studentList = data;
          if (this.studentList.length == 0)
            this.emptyList = true;
          this.studentList.forEach((s, i) => {
            this.route.getRouteById(s.routId).subscribe(data => {
              this.driver.getDriverById(data.driverId).subscribe(data =>
                this.driverList[i] = data),
                this.routeSer.getRouteById(s.routId).subscribe(data =>
                  this.routeList[i] = data)
            })
          })
        })
    })

  }


  navigateToStudentDetails(student: Student | null) {
    let dialogRef = this.dialog.open(StudentDetailsComponent, {
      height: '600px',
      width: '600px',
      data: { student: student }
    });
  }

  deleteStudent(studentToDelete: Student) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.student.deleteStudent(studentToDelete.id).subscribe(res => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          })
        }
      })
  }
}