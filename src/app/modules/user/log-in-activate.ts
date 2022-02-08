import { Injectable, Input } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
@Injectable()
export class LogInActivate implements CanActivate{
    constructor(private _userSer:UserService, private router: Router) {}
    
    canActivate():boolean
    {
        return this._userSer._isLogIn;
    }

}

