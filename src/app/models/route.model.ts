import { Time } from "@angular/common";

export class Route
{
    id!:number;
    name!:string;
    startTime!:Time;
    assumEndTime!:Time;
    direction !:boolean;
    driverId!:number;
    

}