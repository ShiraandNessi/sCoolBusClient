export class User
{
    id!:number;
    password!:string;
    email!:string;
    userTypeId!:number;

}
export enum UserType
{
    manager,
    driver,
    family
}