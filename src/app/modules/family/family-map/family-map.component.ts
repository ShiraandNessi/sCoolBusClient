import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Station } from 'src/app/models/station.model';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-family-map',
  templateUrl: './family-map.component.html',
  styleUrls: ['./family-map.component.scss']
})
export class FamilyMapComponent implements OnInit {
  title = 'my-maps-project';
  zoom = 17
  center!: google.maps.LatLngLiteral
  markers = [] as any
  directionsService = [] as any
  directionsRenderer = [] as any
  stationsList!: Station[];
  selectedStation!: Station;
  image = {
    url: ".\.\.\.\assets\location-pin.png",
    size: new google.maps.Size(20, 32)
  }
  constructor(private station: StationService, @Inject(MatDialogRef) private dialogRef: MatDialogRef<FamilyMapComponent>) { }
  ngOnInit() {
    var map: google.maps.Map;
    this.station.getAllStations().subscribe(data => {
      this.stationsList = data,
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
            this.markers[0] = {
              position: {
                lat: this.center.lat,
                lng: this.center.lng,
              },
              label: {
                color: 'red',
                text: 'you are here',
              },
              title: 'Your Home ',
              options: { animation: google.maps.Animation.BOUNCE },
              setClickable: true
            },
            this.directionsService = new google.maps.DirectionsService(),
            this.directionsRenderer = new google.maps.DirectionsRenderer();
          this.directionsRenderer.setMap(map);
        })
      this.stationsList.forEach((s, i) => {
        this.markers.push({
          position: {
            lat: s.pointX,
            lng: s.pointY,
          },
          label: {
            color: 'black',
            text: s.address,
          },
          icon: this.image,
          title: s.address,
          setClickable: true
        })

        google.maps.event.addListener(this.markers[i], 'onclick', function () { console.log("ggggggggggggggggggg") });

      })
      const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
      });
    })
    this.markers.forEach((m: { addListener: (arg0: string, arg1: () => void) => void; getPosition: () => google.maps.LatLng; }) => {
      google.maps.event.trigger(m, 'click', () => {

        console.log("working!!!!")
      });
    })
  }
  stationForm: FormGroup = new FormGroup({
    "station": new FormControl(null, Validators.required),
  })

  submitStation() {
    console.log(this.selectedStation)
    this.dialogRef.close(this.selectedStation);
  }
}