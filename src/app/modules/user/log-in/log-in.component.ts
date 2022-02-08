import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(private _userSer:UserService,private _router:Router) { }

  ngOnInit(): void {
  }
  user!:User;
  logInForm: FormGroup = new FormGroup({
    "email": new FormControl("", Validators.required),
    "pass": new FormControl("", [Validators.required, Validators.minLength(3)])
  });

  signUpForm: FormGroup = new FormGroup({
    "email": new FormControl("", Validators.required),
    "pass": new FormControl("", [Validators.required, Validators.minLength(3)])
  });

  
  login(email:string,pass:string)
  {
  this._userSer.getUserById(email,pass).subscribe
  (data=>{if(data) {this.user=data;console.log(this.user.userTypeId)} else{console.log("no such user")}} ,er=>console.log(er))
  if(this.user)
  {
    this._userSer.isLogIn()
  switch(this.user.userTypeId)
   {
     case 2:this._router.navigate(['user/manager']); break;
     case 1:this._router.navigate(['user/driver']); break;
     case 3:this._router.navigate(['user/family']); break;
    
   }
  }

 
  }
  // signUp(newEmail:string,newPass:string)
  // {
  //   this._userSer.isLogIn();
  //   this._router.navigate(['user/signUp',newEmail,newPass])
  // }
  signUp(newEmail:string,newPass:string)
  {
    this._userSer.isLogIn();
    this._router.navigate(['user/signUp'])
  }
  
}


