import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyService } from 'src/app/services/family.service';
import { FamilyHomeComponent } from './family-home/family-home.component';
import { SendMessegeComponent } from './send-messege/send-messege.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import {ListboxModule} from 'primeng/listbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { LogInActivate } from '../user/log-in-activate';
import { PassportCameraComponent } from './passport-camera/passport-camera.component';
import { WebcamModule } from 'ngx-webcam';
import {FileUploadModule} from 'primeng/fileupload';
import {MatDialogModule} from "@angular/material/dialog"
import { FamilyMapComponent } from './family-map/family-map.component';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';


const FAMILY_ROUTE:Route[]=[
{path:"user/family/student",component:StudentDetailsComponent,canActivate:[LogInActivate]},
{path:"user/family/student/picture",component:PassportCameraComponent,canActivate:[LogInActivate]}
]
@NgModule({
  declarations: [FamilyHomeComponent,SendMessegeComponent,StudentDetailsComponent,PassportCameraComponent,FamilyMapComponent],
  imports: [
    CommonModule,ListboxModule,FormsModule,GoogleMapsModule,ReactiveFormsModule,WebcamModule,FileUploadModule,MatDialogModule,RouterModule.forChild(FAMILY_ROUTE)
  ],
  providers:[FamilyService]
})
export class FamilyModule { }
