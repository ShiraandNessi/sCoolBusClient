import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from 'src/app/models/route.model';
import { Student } from 'src/app/models/student.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { RouteService } from 'src/app/services/route.service';
import { StudentService } from 'src/app/services/student.service';
import { PassportCameraComponent } from '../passport-camera/passport-camera.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SaveFileService } from 'src/app/services/save-file.service';
import { WebcamImage } from 'ngx-webcam';
import { Family } from 'src/app/models/family.model';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private buildFormData: SaveFileService, private currfamily: CurrentUserService, public dialog: MatDialog, private _acr: ActivatedRoute, private route: RouteService, private currUser: CurrentUserService, private nav: Router, private student: StudentService) {
    this.editStudent = data.student;
  }
  editStudent!: Student;
  webcamImage!: WebcamImage;
  uploadedFile: any;
  selectedRoute!: Route;
  newStudent: Student = new Student();
  routes: Route[] = new Array<Route>();
  registerStudentForm!: FormGroup;
  currFamily!: Family;
  ngOnInit(): void { }


  Register() {

    this.newStudent.firstName = this.registerStudentForm.controls["firstName"].value;
    this.currUser.getFamily().subscribe(data => { this.newStudent.lastName = data.familyName, this.newStudent.familyId = data.id });
    this.newStudent.phone = this.registerStudentForm.controls["personalPhone"].value;
    this.newStudent.grade = this.registerStudentForm.controls["grade"].value;
    this.newStudent.routId = 2;
    // this.newStudent.image=this.webcamImage;
    this.student.addNewStudent(this.newStudent).subscribe(data => {
      this.student.saveStudentImage(data.id, this.uploadedFile).subscribe(data => {
        console.log(data);

        this.currfamily.getFamily().subscribe(data =>
          this.currFamily = data
        )
        this.route.getAllRoutes().subscribe(data => {
          this.routes = data
          if (this.editStudent) {
            this.registerStudentForm = new FormGroup({
              "firstName": new FormControl(this.editStudent.firstName.toString(), Validators.required),
              "personalPhone": new FormControl(this.editStudent.phone, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")),
              "grade": new FormControl(this.editStudent.grade + " th", Validators.required),
              "route": new FormControl("", Validators.required)
            });
          }
          else {
            this.registerStudentForm = new FormGroup({
              "jjjjj": new FormControl(""),
              "firstName": new FormControl("עעוי", Validators.required),
              "personalPhone": new FormControl("0527615756", Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")),
              "grade": new FormControl("", Validators.required),
              "route": new FormControl(null, Validators.required)
            });
          }
        })
      })
    })
  }
  // Register() {

  //   this.newStudent.firstName = this.registerStudentForm.controls["firstName"].value;
  //   this.currUser.getFamily().subscribe(data => { this.newStudent.lastName = data.familyName, this.newStudent.familyId = data.id });
  //   this.newStudent.phone = this.registerStudentForm.controls["personalPhone"].value;
  //   this.newStudent.grade = this.registerStudentForm.controls["grade"].value;
  //   // this.newStudent.routId = this.registerStudentForm.controls["route"].value.id;
  //   this.newStudent.routId = 2;

  //   this.newStudent.familyId = this.currFamily.id;
  //   this.newStudent.lastName = this.currFamily.familyName;
  //   // this.newStudent.image=this.webcamImage;
  //   this.student.addNewStudent(this.newStudent).subscribe(data => {
  //     console.log(data)
  //     this.student.saveStudentImage(data.id, this.uploadedFile).subscribe(data => {
  //       // this.newStudent.imageRoute="././././assets/"+data.id;
  //       console.log(data);
  //     })



  //   })
  // }
  navigateToPicture() {
        let dialogRef = this.dialog.open(PassportCameraComponent, {
          height: '500px',
          width: '500px',
        });
        dialogRef.afterClosed().subscribe(res => {
          if (res) {
            this.uploadedFile = res;
          }
          else
            console.log("hhh")
        })


        // this.nav.navigate(['user/family/student/picture']) 
      }



}
