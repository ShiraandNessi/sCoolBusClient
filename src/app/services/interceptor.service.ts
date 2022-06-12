import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { CurrentUserService } from './current-user.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  token!: string;
  constructor(private currUse: CurrentUserService,private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
if(!this.currUse.currUser)
    return next.handle(req)
    this.token = this.currUse.currUser.token;
    if (this.token) {
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });
      return next.handle(tokenizedReq);
    }
    return next.handle(req)
  }
}
// .pipe(map((event: HttpEvent<any>) => {
//   if (event instanceof HttpResponse) {
//     if (event.status === 401) {
//       this.router.navigate(['user']);
//     }
//   }
//   return event;
// }));;