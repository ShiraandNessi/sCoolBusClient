import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrentUserService } from 'src/app/services/current-user.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(private _userSer:UserService,private _router:Router, private currUser: CurrentUserService) { }

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

  
  login()
  {
    let email=this.logInForm.controls["email"].value
    let pass=this.logInForm.controls["pass"].value
  this._userSer.getUserById(email,pass).subscribe
  (data=>
    {
      if(data) 
      {
        this.user=data;console.log(this.user.userTypeId)
        this._userSer.isLogIn()
        this.currUser.currUser=this.user
        switch(this.user.userTypeId)
          {
            case 1:this._router.navigate(['user/manager']); break;
            case 2:this._router.navigate(['user/driver']); break;
            case 3:this._router.navigate(['user/family']); break;
          }
      }
      else
      {
        console.log("no such user")
      }
    },
    er=>console.log(er))
  if(this.user)
  {
    this._userSer.isLogIn()
    this.currUser.currUser=this.user
  switch(this.user.userTypeId)
   {
     case 1:this._router.navigate(['user/manager']); break;
     case 2:this._router.navigate(['user/driver']); break;
     case 3:this._router.navigate(['user/family']); break;
    
   }
  }

 
  }
  // signUp(newEmail:string,newPass:string)
  // {
  //   this._userSer.isLogIn();
  //   this._router.navigate(['user/signUp',newEmail,newPass])
  // }
  signUp()
  {
    this._userSer.isLogIn();
    this._router.navigate(['use/signUp'])
  }
}


