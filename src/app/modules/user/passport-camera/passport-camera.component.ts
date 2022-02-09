import { Component, OnInit } from '@angular/core';
import {WebcamImage} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';

@Component({
  selector: 'app-passport-camera',
  templateUrl: './passport-camera.component.html',
  styleUrls: ['./passport-camera.component.scss']
})
export class PassportCameraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  title = 'gfgangularwebcam';

  public webcamImage?: WebcamImage ;
  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
  this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
    console.info(this.webcamImage)
  this.webcamImage = webcamImage;
  }
  
  public get triggerObservable(): Observable<void> {
  return this.trigger.asObservable();
  }
}

