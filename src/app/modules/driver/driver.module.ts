import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverService } from 'src/app/services/driver.service';
import { DriverHomeComponent } from './driver-home/driver-home.component';




@NgModule({
  declarations: [
    DriverHomeComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [DriverService]
})
export class DriverModule { }
