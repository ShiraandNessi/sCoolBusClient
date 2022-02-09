import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../models/station.model';
import { StationDriver } from '../models/stationDriver.model';
import { StationRoute } from '../models/stationRoute.model';

@Injectable()
export class StationService {
  baseUrl:string="/api/station/"
  constructor(private _http:HttpClient) { }
  getAllStations():Observable<Station>
  {
    return this._http.get<Station>(this.baseUrl);
  }
  getStationById(id:string):Observable<Station>
  {
    return this._http.get<Station>(this.baseUrl+id);
  }
  getStationByRouteId(routeId:string):Observable<StationRoute[]>
  {
    return this._http.get<StationRoute[]>(this.baseUrl+"route"+routeId)
  }
  getStationByDriverId(driverId:string):Observable<StationDriver[]>
  {
    return this._http.get<StationDriver[]>(this.baseUrl+"driver"+driverId)
  }
  addNewStation(newStation:Station):Observable<Station>
  {
      return this._http.post<Station>(this.baseUrl,newStation);
  }
}
