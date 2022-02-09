export class User
{
    id!:number;
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