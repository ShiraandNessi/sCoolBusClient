export class Message
{
    id!:number;
    messageTypeId!:number;
    driverId!:number;
    messageText!:string;
    routId!:number;
    userId!:number;

}
export enum MessageType{
    stationCancel,
    question,
    message

}