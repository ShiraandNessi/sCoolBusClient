import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {WebcamImage} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';

@Component({
  selector: 'app-passport-camera',
  templateUrl: './passport-camera.component.html',
  styleUrls: ['./passport-camera.component.scss']
})
export class PassportCameraComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  title = 'gfgangularwebcam';

  public webcamImage?: WebcamImage;
  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
  this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
    console.log(this.webcamImage)
  this.webcamImage = webcamImage;

  }
  save()
  {

    this._router.navigate(['user/family/student',{imgURL: "/./././assets/mm.png" }])

  }
  
  public get triggerObservable(): Observable<void> {
  return this.trigger.asObservable();
  }
}

