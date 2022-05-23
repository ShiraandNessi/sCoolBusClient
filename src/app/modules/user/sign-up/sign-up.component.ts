import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Family } from 'src/app/models/family.model';
import { FamilyMapComponent } from '../../family/family-map/family-map.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private _acr: ActivatedRoute,public dialog:MatDialog) { }
  // email!: string | null
  // pass!: string | null
  newFamily:Family=new Family();
  submitted:boolean=false;
  registerForm:FormGroup;
  ngOnInit(): void {
   this.registerForm = new FormGroup({
      familyName:new FormControl("", Validators.required),
      fatherName:new FormControl("", Validators.required),
      motherName:new FormControl("", Validators.required),
      motherPhone:new FormControl("",[ Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      fatherPhone:new FormControl("",[ Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      address:new FormControl("", Validators.required),
     email: new FormControl("", [Validators.required,Validators.email]),
     pass: new FormControl("", [Validators.required, Validators.minLength(3)]),
     motherWhatsApp: new FormControl(true),
     fatherWhatsApp: new FormControl(true)
   
   
   });  
 }

chooseStation(){
  const dialogRef = this.dialog.open(FamilyMapComponent, {
    height: '600px',
    width: '600px'
  });
  dialogRef.afterClosed().subscribe(res=>{
    if(res){
      this.newFamily.stationId=res;console.log(res)
    }
  })
}
Register()
{
  this.newFamily.email= this.registerForm.controls["email"].value;
  this.newFamily.password= this.registerForm.controls["pass"].value;
  this.newFamily.familyName= this.registerForm.controls["familyName"].value;
  this.newFamily.fatherName= this.registerForm.controls["fatherName"].value;
  this.newFamily.motherName= this.registerForm.controls["motherName"].value;
  this.newFamily.fatherPhone= this.registerForm.controls["fatherPhone"].value;
  this.newFamily.motherPhone= this.registerForm.controls["motherPhone"].value;
  this.newFamily.motherPhone= this.registerForm.controls["motherPhone"].value;
  this.newFamily.address= this.registerForm.controls["address"].value;
  this.newFamily.enableMotherWhatsApp= this.registerForm.controls["motherWhatsApp"].value;
  this.newFamily.enableFatherWhatsApp= this.registerForm.controls["fatherWhatsApp"].value;
  console.log(this.newFamily);

}
get registerFormControl() {
  return this.registerForm.controls;
}

onSubmit() {
  this.submitted = true;
  if (this.registerForm.valid) {
    this.Register();
  }
}

}
