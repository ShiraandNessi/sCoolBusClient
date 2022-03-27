export class Message
{
    constructor() {
        this.id=0
     }
    id:number;
    messageTypeId!:number;
    driverId!:number;
    messageText:string | null | undefined;
    routId!:number;
    userId!:number;
    isRead!:boolean;
    studentId!:number
}
export enum MessageType{
    stationCancel,
    forgetChild,
    other

}