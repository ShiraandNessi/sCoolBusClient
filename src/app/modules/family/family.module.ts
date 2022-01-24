import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyService } from 'src/app/services/family.service';
import { FamilyHomeComponent } from './family-home/family-home.component';



@NgModule({
  declarations: [FamilyHomeComponent],
  imports: [
    CommonModule
  ],
  providers:[FamilyService]
})
export class FamilyModule { }
