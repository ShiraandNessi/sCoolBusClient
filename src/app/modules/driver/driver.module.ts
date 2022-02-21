import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverService } from 'src/app/services/driver.service';
import { DriverHomeComponent } from './driver-home/driver-home.component';
import {BadgeModule} from 'primeng/badge';
import { StudentsComponent } from './students/students.component';
import {MatStepperModule} from '@angular/material/stepper'
import { Route, RouterModule, RoutesRecognized } from '@angular/router';
import { LogInActivate } from '../user/log-in-activate';
import { MessagesComponent } from '../user/messages/messages.component';
import { RoutesComponent } from './routes/routes.component';
import { MessageService } from 'src/app/services/message.service';
import { RouteService } from 'src/app/services/route.service';
import { StationService } from 'src/app/services/station.service';
import { SharedModule } from 'primeng/api';
import { StudentService } from 'src/app/services/student.service';



const DRIVER_ROUTE:Route[]=[
  {path:"user/driver/routes",component:RoutesComponent,canActivate:[LogInActivate]},
  {path:"user/driver/students",component:StudentsComponent,canActivate:[LogInActivate]},
  {path:"user/driver/messages",component:MessagesComponent,canActivate:[LogInActivate]},

]


@NgModule({
  declarations: [
    DriverHomeComponent,
    StudentsComponent,
    RoutesComponent
  ],
  imports: [
    CommonModule,MatStepperModule,BadgeModule,SharedModule,RouterModule.forChild(DRIVER_ROUTE)
  ],
  providers: [DriverService,MessageService,RouteService,StationService,StudentService]
})
export class DriverModule { }
