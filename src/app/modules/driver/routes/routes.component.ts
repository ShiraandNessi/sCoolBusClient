import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { Route } from 'src/app/models/route.model';
import { StationRoute } from 'src/app/models/stationRoute.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { RouteService } from 'src/app/services/route.service';
import { StationService } from 'src/app/services/station.service';
import {PrimeIcons} from 'primeng/api';


@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})

export class RoutesComponent implements OnInit {
icon=PrimeIcons.MAP_MARKER
  constructor(private _router:Router,private route:RouteService,private curr:CurrentUserService, private station:StationService,private _acr:ActivatedRoute) { 
   
  }
  stationsList!:StationRoute[];
  resRoute:Route=new Route();
  driver:Driver=new Driver();
  direction:string | undefined | null;
  ngOnInit(): void {
    this.curr.getDriver().subscribe(data=>{this.driver=data,console.log("d",this.driver)
    this.route.getRouteByDriverId(this.driver.id).subscribe(data=>{this.resRoute=data,console.log("r",this.resRoute)
    this.station.getStationByRouteId(this.resRoute.id).subscribe(data=>{this.stationsList=data,this.direction= this._acr.snapshot.paramMap.get('direction');
    if(this.direction=="false")
    {
      this.stationsList=this.stationsList.reverse();
    }})})})
    

  }
  
  toMap(){
    this.station.stationList=this.stationsList;
    this._router.navigate(['user/driver/routes/map']) ;
  }

 

}
