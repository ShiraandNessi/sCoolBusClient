import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import { Route } from 'src/app/models/route.model';
import { StationRoute } from 'src/app/models/stationRoute.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { RouteService } from 'src/app/services/route.service';
import { StationService } from 'src/app/services/station.service';


@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {

  constructor(private route:RouteService,private curr:CurrentUserService, private station:StationService) { 
   
  }

  stationsList!:StationRoute[];
  resRoute:Route=new Route();
  driver:Driver=new Driver();
  ngOnInit(): void {
    this.curr.getDriver().subscribe(data=>{this.driver=data,console.log("d",this.driver)
    this.route.getRouteByDriverId(this.driver.id).subscribe(data=>{this.resRoute=data[0],console.log("r",this.resRoute)
    this.station.getStationByRouteId(this.resRoute.id).subscribe(data=>{this.stationsList=data,console.log("sl",this.stationsList)})})})

  }

    
 

}
