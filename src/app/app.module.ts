import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './modules/user/user.module';
import { HttpClientModule } from '@angular/common/http'
import { LogInComponent } from './modules/user/log-in/log-in.component';
import { Route, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CurrentUserService } from './services/current-user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



const APP_ROUTES:Route[]=[
  {path:"", pathMatch: "full", redirectTo: "user"},
  {path:"user",component:LogInComponent},
]

@NgModule({
  declarations: [
    AppComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    BrowserAnimationsModule
  ],
  providers: [CurrentUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
