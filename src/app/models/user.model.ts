export class User
{
    constructor() {
        this.id=0
     }
    id:number;
    password!:string;
    email!:string;
    userTypeId!:number;
    token!:string;

}
export enum UserType
{
    manager,
    driver,
    family
}