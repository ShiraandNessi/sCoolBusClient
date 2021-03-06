import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverService } from 'src/app/services/driver.service';
import { DriverHomeComponent } from './driver-home/driver-home.component';
import {BadgeModule} from 'primeng/badge';
import { StudentsComponent } from './students/students.component';
// import {MatStepperModule} from '@angular/material/stepper'
import { Route, RouterModule, RoutesRecognized } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { RoutesComponent } from './routes/routes.component';
import { MessageService } from 'src/app/services/message.service';
import { RouteService } from 'src/app/services/route.service';
import { StationService } from 'src/app/services/station.service';
import { StudentService } from 'src/app/services/student.service';
import { TimelineModule} from 'primeng/timeline';
import { CardModule } from "primeng/card";
import {AccordionModule} from 'primeng/accordion';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DriverMapComponent } from './driver-map/driver-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SideBarDriverComponent } from './side-bar-driver/side-bar-driver.component';
import { StudentStatusService } from 'src/app/services/studentStatus.service';
import { InterceptorService } from 'src/app/services/interceptor.service';
// import { SharedModule } from 'primeng/api';



// const DRIVER_ROUTE:Route[]=[
//   {path:"",component:NavBarComponent,canActivate:[LogInActivate],children:[ 
//     {path:"",component:DriverHomeComponent,canActivate:[LogInActivate]},
//     {path:"user/driver/routes",component:RoutesComponent,canActivate:[LogInActivate]},
//   {path:"user/driver/students",component:StudentsComponent,canActivate:[LogInActivate]},
//   {path:"user/driver/messages",component:MessagesComponent,canActivate:[LogInActivate]},
// {path:"user/driver/routes/map",component:DriverMapComponent}]}
// ]


@NgModule({
  declarations: [
    DriverHomeComponent,
    StudentsComponent,
    RoutesComponent,
    MessagesComponent,
    NavBarComponent,
    DriverMapComponent,
    SideBarDriverComponent
    
  ],
  imports: [
    CommonModule,AccordionModule,BadgeModule,TimelineModule,CardModule,RouterModule,GoogleMapsModule],
  providers: [DriverService,MessageService,RouteService,StationService,StudentService,StudentStatusService]
})
export class DriverModule { }
