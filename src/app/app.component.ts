import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from './models/driver.model';
import { DriverService } from './services/driver.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'SchoolBus';
  constructor(private _router:Router){}
  ngOnInit()
  {
    this._router.navigate(["user"]);
  }

}
