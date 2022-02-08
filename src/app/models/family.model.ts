import { Station } from "./station.model";

export class Family{
id!:number;
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