import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../models/station.model';
import { StationDriver } from '../models/stationDriver.model';
import { StationRoute } from '../models/stationRoute.model';
import { CurrentUserService } from './current-user.service';

@Injectable()
export class StationService {
  baseUrl:string="/api/station/"
  
  constructor(private _http:HttpClient,private curUser:CurrentUserService) { }
  stationList!:StationRoute[];
  userToken= this.curUser.currUser.token;
headers= new HttpHeaders()
  .set( 'Authorization', 'Bearer ' + 'userToken')
  getAllStations():Observable<Station[]>
  {
    return this._http.get<Station[]>(this.baseUrl);
  }
  getStationById(id:number):Observable<Station>
  {
    return this._http.get<Station>(this.baseUrl+id);
  }
  getStationByRouteId(routeId:number):Observable<StationRoute[]>
  {
    return this._http.get<StationRoute[]>(this.baseUrl+"route/"+routeId,{ 'headers': this.headers })
  }
  getStationByDriverId(driverId:number):Observable<StationDriver[]>
  {
    return this._http.get<StationDriver[]>(this.baseUrl+"driver"+driverId)
  }
  addNewStation(newStation:Station):Observable<Station>
  {
      return this._http.post<Station>(this.baseUrl,newStation);
  }
}
