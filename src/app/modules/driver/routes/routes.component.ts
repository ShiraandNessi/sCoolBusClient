import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { Route } from 'src/app/models/route.model';
import { StationRoute } from 'src/app/models/stationRoute.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { RouteService } from 'src/app/services/route.service';
import { StationService } from 'src/app/services/station.service';
import {PrimeIcons} from 'primeng/api';
import { MessageService } from 'src/app/services/message.service';
import { StudentService } from 'src/app/services/student.service';
import { FamilyService } from 'src/app/services/family.service';
import { Station } from 'src/app/models/station.model';
import { Message } from 'src/app/models/message.model';


@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})

export class RoutesComponent implements OnInit {
icon=PrimeIcons.MAP_MARKER
  constructor(private family:FamilyService, private _router:Router,private route:RouteService,private curr:CurrentUserService, private station:StationService,private _acr:ActivatedRoute,private student:StudentService ,private mess:MessageService) { 
   
  }
  stationsList:StationRoute[]=new Array<StationRoute>();
  messagesList!:Message[];
  resRoute:Route=new Route();
  driver:Driver=new Driver();
  countCancelStation:Map<number,number>=new Map<number,number>();
  direction:string | undefined | null;
  ngOnInit(): void {
    this.curr.getDriver().subscribe(data=>{this.driver=data,console.log("d",this.driver)
    this.route.getRouteByDriverId(this.driver.id).subscribe(data=>{this.resRoute=data,console.log("r",this.resRoute)
    this.station.getStationByRouteId(this.resRoute.id).subscribe(data=>{this.stationsList=data,this.direction= this._acr.snapshot.paramMap.get('direction');
    if(this.direction=="false")
    {
      this.stationsList=this.stationsList.reverse();
    }
  this.mess.getMessageByDriverId(this.driver.id).subscribe(data=>{
    this.messagesList=data,this.messagesList=this.messagesList.filter(m=>m.messageTypeId==1), 
    this.messagesList.forEach((m,i)=>{
      this.student.getStudentById(m.studentId).subscribe(s=>{
        this.family.getFamilyById(s.familyId).subscribe(f=>{
          let x=this.countCancelStation.get(f.stationId);
          if(x)
          {
          this.countCancelStation.set(f.stationId,x+1);
          this.student.GetCountOfStudentsBystationId(s.routId,f.stationId).subscribe(c=>{
            if(c==this.countCancelStation.get(f.stationId))
            {
             let index=this.stationsList.findIndex(s=>s.stationId==f.stationId)
             this.stationsList[index].routeId=-1;
                console.log("kk",index,c,this.countCancelStation.get(f.stationId),this.stationsList[1])
               
            }
         
          })
          }
          else
          this.countCancelStation.set(f.stationId,1);
         
        })
      })
    })
 
    
  })
  })
})})
    

  }
  
  toMap(){
    this.station.stationList=this.stationsList;
    this._router.navigate(['user/driver/routes/map']) ;
  }

 

}
