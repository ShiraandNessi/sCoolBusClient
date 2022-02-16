import { Time } from "@angular/common";

export class Route
{
    constructor() {
        this.id=0
     }
    id:number;
    name!:string;
    startTime!:Time;
    assumEndTime!:Time;
    direction !:boolean;
    driverId!:number;
    

}