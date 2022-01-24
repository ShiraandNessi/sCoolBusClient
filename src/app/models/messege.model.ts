export class Messege
{
    id!:number;
    messageTypeId!:number;
    driverId!:number;
    messageText!:string;
    routId!:number;
    userId!:number;

}
export enum MessegeType{
    stationCancel,
    question,
    messege

}