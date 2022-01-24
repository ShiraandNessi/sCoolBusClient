import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RouteService {

  constructor(private _http :HttpClient) { }
  baseUrl: string = "/api/Route/"
  getAllRoutes():Observable <Route[]>
  {
    return this._http.get<Route[]>(this.baseUrl)
  }

  getRouteByDriverId(DriverId: string):Observable <Route[]>
  {
    return this._http.get<Route[]>(this.baseUrl+DriverId)
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
