import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Family } from 'src/app/models/family.model';
import { FamilyService } from 'src/app/services/family.service';
import { FamilyMapComponent } from '../../family/family-map/family-map.component';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private _acr: ActivatedRoute, private currUser: CurrentUserService, public dialog: MatDialog, private _userSer: UserService, private _family: FamilyService, private _router: Router) {
    if(data.family)
    this.editFamily=data.family
   }
  // email!: string | null
  // pass!: string | null
  editFamily!: Family;
  newFamily: Family = new Family();
  submitted: boolean = false;
  registerForm!: FormGroup;
  ngOnInit(): void {
    if (this.editFamily) {
      console.log(this.editFamily)
      this.registerForm= new FormGroup({
        "familyName":new FormControl(this.editFamily.familyName.toString(), Validators.required),
        "fatherName":new FormControl(this.editFamily.fatherName.toString(), Validators.required),
        "motherName":new FormControl(this.editFamily.motherName.toString(), Validators.required),
        "fatherPhone":new FormControl(this.editFamily.fatherPhone,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")),
        "motherPhone":new FormControl(this.editFamily.motherPhone,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")),
        "address":new FormControl(this.editFamily.address.toString(), Validators.required),
        "email":new FormControl(this.editFamily.email.toString(), Validators.email),
        "pass":new FormControl(this.editFamily.password.toString(), Validators.minLength(3)),
        "motherWhatsApp":new FormControl(this.editFamily.enableMotherWhatsApp),
        "fatherWhatsApp":new FormControl(this.editFamily.enableFatherWhatsApp),
      });
    }
    else {
      this.registerForm = new FormGroup({
        familyName: new FormControl("", Validators.required),
        fatherName: new FormControl("", Validators.required),
        motherName: new FormControl("", Validators.required),
        motherPhone: new FormControl("", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        fatherPhone: new FormControl("", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        address: new FormControl("", Validators.required),
        station: new FormControl("", Validators.required),
        email: new FormControl("", [Validators.required, Validators.email]),
        pass: new FormControl("", [Validators.required, Validators.minLength(3)]),
        motherWhatsApp: new FormControl(true),
        fatherWhatsApp: new FormControl(true)
      });
    }
  }

  chooseStation() {
    const dialogRef = this.dialog.open(FamilyMapComponent, {
      height: '600px',
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.newFamily.stationId = res.stationId,
        this.registerForm.patchValue({
          "station":res.name
      }),
      document.getElementById("station")!.innerHTML = res.name,
      console.log(res)
    }
      else
        console.log("hhh")
    })
  }
  Register() {
    this.newFamily.email = this.registerForm.controls["email"].value;
    this.newFamily.password = this.registerForm.controls["pass"].value;
    this.newFamily.familyName = this.registerForm.controls["familyName"].value;
    this.newFamily.fatherName = this.registerForm.controls["fatherName"].value;
    this.newFamily.motherName = this.registerForm.controls["motherName"].value;
    this.newFamily.fatherPhone = this.registerForm.controls["fatherPhone"].value;
    this.newFamily.motherPhone = this.registerForm.controls["motherPhone"].value;
    this.newFamily.motherPhone = this.registerForm.controls["motherPhone"].value;
    this.newFamily.address = this.registerForm.controls["address"].value;
    this.newFamily.enableMotherWhatsApp = this.registerForm.controls["motherWhatsApp"].value;
    this.newFamily.enableFatherWhatsApp = this.registerForm.controls["fatherWhatsApp"].value;
    this.newFamily.stationId = 3;
    console.log(this.newFamily);
    this._family.addNewFamily(this.newFamily).subscribe(res => {
      Swal.fire({
        title: '<strong style="font-size=2rem">WELCOME!!<strong>',
        imageUrl: '././././assets/schoolBusLogo.png',
        imageWidth: 100,
        imageHeight: 100,
        confirmButtonColor: '#1689fc'
      }).then(res => {
        this._userSer.getUserById(this.newFamily.email, this.newFamily.password).subscribe
          (data => {
            if (data) {
              this._userSer.isLogIn()
              this.currUser.currUser = data
              this._router.navigate(['user/family']);
            }
          })
      })

    })
  }
  // get registerFormControl() {
  //   return this.registerForm.controls;
  // }

  // onSubmit() {
  //   this.submitted = true;
  //   if (this.registerForm.valid) {
  //     this.Register();
  //   }
  // }

}
