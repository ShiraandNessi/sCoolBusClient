import { Station } from "./station.model";

export class StationRoute
{
    constructor() {
    this.routeId=0
 }
    
    routeId!:number;
    stationId!:number;
    address!:string;
    pointX!:number;
    pointY!:number;
}