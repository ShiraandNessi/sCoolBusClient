import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverModule } from '../driver/driver.module';
import { ManagerModule } from '../manager/manager.module';
import { FamilyModule } from '../family/family.module';
import { UserService } from 'src/app/services/user.service';
import { LogInComponent } from './log-in/log-in.component';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { DriverHomeComponent } from '../driver/driver-home/driver-home.component';
import { FamilyHomeComponent } from '../family/family-home/family-home.component';
import { ManagerHomeComponent } from '../manager/manager-home/manager-home.component';
import { LogInActivate } from './log-in-activate';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import {StepsModule} from 'primeng/steps';
import { StepsComponent } from './sign-up/steps/steps.component';
import { NavBarComponent } from '../driver/nav-bar/nav-bar.component';
import { RoutesComponent } from '../driver/routes/routes.component';
import { StudentsComponent } from '../driver/students/students.component';
import { MessagesComponent } from '../driver/messages/messages.component';




const USER_ROUTE:Route[]=[
  {path:"user/driver",component:NavBarComponent,canActivate:[LogInActivate],children:[
    {path:"",component:DriverHomeComponent,canActivate:[LogInActivate]},
    {path:"routes",component:RoutesComponent,canActivate:[LogInActivate]},
    {path:"students",component:StudentsComponent,canActivate:[LogInActivate]},
    {path:"messages",component:MessagesComponent,canActivate:[LogInActivate]}
  ]},
  {path:"user/manager",component:ManagerHomeComponent,canActivate:[LogInActivate]},
  {path:"user/family",component:FamilyHomeComponent,canActivate:[LogInActivate]},
  {path:"user/signUp",component:SignUpComponent,canActivate:[LogInActivate]}
]


@NgModule({
  declarations: [LogInComponent, SignUpComponent,StepsComponent],
  imports: [ReactiveFormsModule,CommonModule,ManagerModule,
    FamilyModule,DriverModule,RouterModule.forChild(USER_ROUTE),
    FormsModule,StepsModule],
  providers:[UserService,LogInActivate]
})
export class UserModule {}
