import { Component, Inject, OnInit } from '@angular/core';
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
  selectedStation!: Station ;
  image = {
    url: ".\.\.\.\assets\location-pin.png",
    size: new google.maps.Size(20, 32)
  }
  constructor(private station: StationService, @Inject(MatDialogRef) private dialogRef:MatDialogRef<FamilyMapComponent>) { }
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
          // this.map = new google.maps.Map(
          //   document.getElementById("map") as HTMLElement,
          //   {
          //     zoom: 6,
          //     center: { lat: 41.85, lng: -87.65 },
          //   }
          // );

          this.directionsRenderer.setMap(map);

        })
      
      // google.maps.event.addListener((this.markers[0], 'onclick',function(){return console.log("ggggggggggggggggggg")});

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
      //markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      // this.markers[0].addListener("click", () => {
      //   infoWindow.setContent(this.markers[0].label);
      //   infoWindow.open(this.map, this.markers[0]);
      // });
      
    })
    this.markers.forEach((m: { addListener: (arg0: string, arg1: () => void) => void; getPosition: () => google.maps.LatLng; }) => {
      google.maps.event.trigger(m, 'click', () => {

        console.log("working!!!!")
      });
    })

  }
  submitStation(){
    this.dialogRef.close(this.selectedStation.id); 
  }
}