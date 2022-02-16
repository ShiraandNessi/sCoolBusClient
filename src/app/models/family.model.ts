import { Station } from "./station.model";

export class Family{
    constructor() {
        this.id=0
     }
id:number;
familyName!:string;
motherName!:string;
fatherName!:string;
address!:string;
motherPhone!:string;
fatherPhone!:string;
Email!:string;
enableMotherWhatsApp!:boolean;
enableFatherWhatsApp!:boolean;
stationId!:number;
userId!:number;
password!:string;
station!:Station;
}