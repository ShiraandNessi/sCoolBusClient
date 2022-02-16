import { Injectable } from '@angular/core';
import { Driver } from '../models/driver.model';
import { Family } from '../models/family.model';
import { User } from '../models/user.model';
import { ManagerHomeComponent } from '../modules/manager/manager-home/manager-home.component';
import { DriverService } from './driver.service';
import { FamilyService } from './family.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private famSer:FamilyService,private driSer:DriverService) { }
  currDriver:Driver=new Driver();
  currFamily:Family=new Family() ;
  currUser!:User;
  getDriver()
  {
    return this.driSer.getDriverByUserId(this.currUser.id)
  }
  getFamily()
  {
   return  this.famSer.getFamilyByUserId(this.currUser.id)
    
  }
  getManage()
  {
   
    return this.currUser;
  }
}
