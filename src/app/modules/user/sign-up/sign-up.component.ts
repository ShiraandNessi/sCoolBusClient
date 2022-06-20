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
import { Station } from 'src/app/models/station.model';
import { StationService } from 'src/app/services/station.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _stationService: StationService, private _acr: ActivatedRoute, private currUser: CurrentUserService, public dialog: MatDialog, private _userSer: UserService, private _family: FamilyService, private _router: Router) {
    if (data.family)
      this.editFamily = data.family
  }
  // email!: string | null
  // pass!: string | null
  stationId!: number;
  editFamily!: Family;
  station!: Station;
  newFamily: Family = new Family();
  submitted: boolean = false;
  registerForm!: FormGroup;
  ngOnInit(): void {
    if (this.editFamily) {
      this._stationService.getStationById(this.editFamily.stationId).subscribe(data => {
        this.registerForm = new FormGroup({
          "familyName": new FormControl(this.editFamily.familyName.toString(), Validators.required),
          "fatherName": new FormControl(this.editFamily.fatherName.toString(), Validators.required),
          "motherName": new FormControl(this.editFamily.motherName.toString(), Validators.required),
          "fatherPhone": new FormControl(this.editFamily.fatherPhone, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")),
          "motherPhone": new FormControl(this.editFamily.motherPhone, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")),
          "address": new FormControl(this.editFamily.address.toString(), Validators.required),
          "station": new FormControl(data.address.toString(), Validators.required),
          "email": new FormControl(this.editFamily.email.toString(), Validators.email),
          "pass": new FormControl(this.editFamily.password.toString(), Validators.minLength(3)),
          "motherWhatsApp": new FormControl(this.editFamily.enableMotherWhatsApp),
          "fatherWhatsApp": new FormControl(this.editFamily.enableFatherWhatsApp),
        });
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
            "station": res.address
          }),
          this.stationId = res.id
          console.log(res.id)
      }
      else
        console.log("hhh")
    })
  }
  Update() {
    let familyToEdit:Family
    this.currUser.getFamily().subscribe(f=>{familyToEdit=f
    familyToEdit.email = this.registerForm.controls["email"].value;
    familyToEdit.familyName = this.registerForm.controls["familyName"].value;
    familyToEdit.fatherName = this.registerForm.controls["fatherName"].value;
    familyToEdit.motherName = this.registerForm.controls["motherName"].value;
    familyToEdit.fatherPhone = this.registerForm.controls["fatherPhone"].value;
    familyToEdit.motherPhone = this.registerForm.controls["motherPhone"].value;
    familyToEdit.motherPhone = this.registerForm.controls["motherPhone"].value;
    familyToEdit.address = this.registerForm.controls["address"].value;
    familyToEdit.enableMotherWhatsApp = this.registerForm.controls["motherWhatsApp"].value;
    familyToEdit.enableFatherWhatsApp = this.registerForm.controls["fatherWhatsApp"].value;
  //  this.stationId = 3;
    familyToEdit.stationId = this.stationId;
    console.log(familyToEdit);
    this._family.updateFmaily(familyToEdit,this.registerForm.controls["pass"].value).subscribe(res => {
      Swal.fire({
        title: '<strong style="font-size=2rem">update sucsesfully!!<strong>',
        text: familyToEdit.familyName,
        imageUrl: '././././assets/schoolBusLogo.png',
        imageWidth: 100,
        imageHeight: 100,
        confirmButtonColor: '#1689fc'
      })

    })});
  }
  Register(){
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
   // this.stationId = 3;
    this.newFamily.stationId = this.stationId;
    console.log(this.newFamily);
    this._family.addNewFamily(this.newFamily).subscribe(res => {
      Swal.fire({
        title: '<strong style="font-size=2rem">WELCOME!!<strong>',
        text: this.newFamily.familyName,
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
