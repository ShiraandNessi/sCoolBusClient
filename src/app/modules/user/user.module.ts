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
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import {StepsModule} from 'primeng/steps';
import { StepsComponent } from './sign-up/steps/steps.component';
import { NavBarComponent } from '../driver/nav-bar/nav-bar.component';
import { RoutesComponent } from '../driver/routes/routes.component';
import { StudentsComponent } from '../driver/students/students.component';
import { MessagesComponent } from '../driver/messages/messages.component';
import { DriverMapComponent } from '../driver/driver-map/driver-map.component';
import { LogInActivateGuard } from './log-in-activate.guard';




const USER_ROUTE:Route[]=[
  {path:"user/driver",component:NavBarComponent,canActivate:[LogInActivateGuard],children:[
    {path:"",component:DriverHomeComponent,canActivate:[LogInActivateGuard]},
    {path:"routes",component:RoutesComponent,canActivate:[LogInActivateGuard]},
    {path:"students",component:StudentsComponent,canActivate:[LogInActivateGuard]},
    {path:"messages",component:MessagesComponent,canActivate:[LogInActivateGuard]},
  {path:"routes/map",component:DriverMapComponent,canActivate:[LogInActivateGuard]}
  ]},
  {path:"user/manager",component:ManagerHomeComponent,canActivate:[LogInActivateGuard]},
  {path:"user/family",component:FamilyHomeComponent,canActivate:[LogInActivateGuard]},
  // {path:"user/manager",loadChildren: () => import("..//manager/manager.module").then(m => m.ManagerModule)},
  // {path:"user/family", loadChildren: () => import("..//family/family.module").then(m => m.FamilyModule)},
  {path:"user/signUp",component:SignUpComponent,canActivate:[LogInActivateGuard]}
]


@NgModule({
  declarations: [LogInComponent, SignUpComponent,StepsComponent],
  imports: [ReactiveFormsModule,CommonModule,ManagerModule,
    FamilyModule,DriverModule,RouterModule.forChild(USER_ROUTE),
    FormsModule,StepsModule],
  providers:[UserService,LogInActivateGuard]
})
export class UserModule {}
