import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {WebcamImage} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';

@Component({
  selector: 'app-passport-camera',
  templateUrl: './passport-camera.component.html',
  styleUrls: ['./passport-camera.component.scss']
})
export class PassportCameraComponent implements OnInit {

  constructor(private _router: Router, @Inject(MatDialogRef) private dialogRef:MatDialogRef<PassportCameraComponent>) { }

  ngOnInit(): void {
  }
  title = 'gfgangularwebcam';
  uploadedFile:any;
  public webcamImage?: WebcamImage;
  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
  this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
    console.log(this.webcamImage)
  this.webcamImage = webcamImage;

  }
  handler(event : any){
  //  this.uploadedFile= document.getElementById("file")?.innerHTML;
     this.uploadedFile = event.target.files;
  }
  save()
  {

    this.dialogRef.close( this.uploadedFile); 
  }
  
  public get triggerObservable(): Observable<void> {
  return this.trigger.asObservable();
  }
}

