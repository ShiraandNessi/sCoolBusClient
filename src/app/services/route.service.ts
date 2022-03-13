import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Route } from '../models/route.model';
import { CurrentUserService } from './current-user.service';

@Injectable()
export class RouteService {

  constructor(private _http :HttpClient, private currUser:CurrentUserService) { }
  baseUrl: string = "/api/Route/"
  
  userToken= this.currUser.currUser.token;
  headers= new HttpHeaders()
  .set( 'Authorization', 'Bearer ' + 'userToken')
  getAllRoutes():Observable <Route[]>
  {
    return this._http.get<Route[]>(this.baseUrl)
  }
  getRouteById(id:number):Observable <Route>
  {
    return this._http.get<Route>(this.baseUrl+id)
  }

  getRouteByDriverId(driverId: number):Observable <Route>
  {
    return this._http.get<Route>(this.baseUrl+driverId,{ 'headers': this.headers })
  }

  addNewRoute(newRoute: Route):Observable <Route>
  {
    return this._http.post<Route>(this.baseUrl, newRoute)
  }
  addNewStationToRoute(routeId:string,newSationId:string):Observable<any>
  {
    return this._http.post<Route>(this.baseUrl+routeId+"/"+newSationId,null);
  }
}
