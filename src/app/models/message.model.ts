export class Message
{
    constructor() {
        this.id=0
     }
    id:number;
    messageTypeId!:number;
    driverId!:number;
    messageText!:string;
    routId!:number;
    userId!:number;
    isRead!:boolean;

}
export enum MessageType{
    stationCancel,
    forgetChild,
    message

}