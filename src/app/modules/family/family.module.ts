import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyService } from 'src/app/services/family.service';
import { FamilyHomeComponent } from './family-home/family-home.component';
import { SendMessegeComponent } from './send-messege/send-messege.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import {ListboxModule} from 'primeng/listbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { PassportCameraComponent } from './passport-camera/passport-camera.component';
import { WebcamModule } from 'ngx-webcam';
import {FileUploadModule} from 'primeng/fileupload';
import {MatDialogModule} from "@angular/material/dialog"
import { FamilyMapComponent } from './family-map/family-map.component';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { LogInActivateGuard } from '../user/log-in-activate.guard';
import {TooltipModule} from 'primeng/tooltip';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import { NavBarFamilyComponent } from './nav-bar-family/nav-bar-family.component';
import { SideBarFamilyComponent } from './side-bar-family/side-bar-family.component';
import { StudentStatusService } from 'src/app/services/studentStatus.service';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';



// const FAMILY_ROUTE:Route[]=[
//   {path:"user/family/familyHome",component:FamilyHomeComponent,canActivate:[LogInActivateGuard]},
//   {path:"user/family/sendMessages",component:SendMessegeComponent,canActivate:[LogInActivateGuard]},
// {path:"user/family/student",component:StudentDetailsComponent,canActivate:[LogInActivateGuard]},
// {path:"user/family/student/picture",component:PassportCameraComponent,canActivate:[LogInActivateGuard]}
// ]
@NgModule({
  declarations: [FamilyHomeComponent,SendMessegeComponent,StudentDetailsComponent,PassportCameraComponent,FamilyMapComponent, NavBarFamilyComponent, SideBarFamilyComponent],
  imports: [
    MessagesModule,MessageModule,CommonModule,ListboxModule,MatTooltipModule,TooltipModule,CascadeSelectModule,FormsModule,GoogleMapsModule,ReactiveFormsModule,WebcamModule,FileUploadModule,MatDialogModule,RouterModule
  ],
  providers:[FamilyService,StudentStatusService]
})
export class FamilyModule { }
