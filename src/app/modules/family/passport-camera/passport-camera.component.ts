import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-passport-camera',
  templateUrl: './passport-camera.component.html',
  styleUrls: ['./passport-camera.component.scss']
})
export class PassportCameraComponent implements OnInit {

  constructor(private _router: Router, @Inject(MatDialogRef) private dialogRef: MatDialogRef<PassportCameraComponent>) { }

  ngOnInit(): void {
  }
  title = 'gfgangularwebcam';
  uploadedFile: any;
   webcamImage?: WebcamImage;
   trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
    this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
    console.log(this.webcamImage?.imageAsBase64)
    this.webcamImage = webcamImage;

  }
  handler(event: any) {
    //  this.uploadedFile= document.getElementById("file")?.innerHTML;
    this.uploadedFile = event.target.files;
  }
  save() {
    if (this.uploadedFile) {
      this.dialogRef.close(this.uploadedFile);
    }
    else {
      console.log(this.webcamImage);
      var a = this.dataURItoBlob(this.webcamImage?.imageAsDataUrl);
      this.dialogRef.close(a);
    }
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

   dataURItoBlob(dataURI: any) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
  }
}

