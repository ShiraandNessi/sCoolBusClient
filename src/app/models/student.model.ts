import { WebcamImage } from "ngx-webcam";

export class Student
{
    constructor() {
        this.id=0
     }
    id:number;
    familyId!:number;
    firstName!:string;
    lastName!:string;
    grade!:number;
    phone?:string;
    passport?:string|undefined;
    routId!: number;
    imageRoute?:string;    

}