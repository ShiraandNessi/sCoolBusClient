import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Family } from 'src/app/models/family.model';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-nav-bar-family',
  templateUrl: './nav-bar-family.component.html',
  styleUrls: ['./nav-bar-family.component.scss']
})
export class NavBarFamilyComponent implements OnInit {

  constructor(private _currUser: CurrentUserService, private _router: Router) { }
  currentFamily!: Family;
  sideBar: boolean = false;
  ngOnInit(): void {
    this._currUser.getFamily().subscribe(data => this.currentFamily = data)
  }
  sideBarFunc(){
    this.sideBar=!this.sideBar;
  }
  navigate(num: number) {
    switch (num) {
      // case 1: this._router.navigate(['user/driver/routes']); break;
      case 2: this._router.navigate(['user/family/sendMessages']); break;
      case 3: this._router.navigate(['user/family/familyHome']); break;
    }
  }


}
