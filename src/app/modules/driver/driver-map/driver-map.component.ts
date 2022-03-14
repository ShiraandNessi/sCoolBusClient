import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Station } from 'src/app/models/station.model';
import { StationRoute } from 'src/app/models/stationRoute.model';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-driver-map',
  templateUrl: './driver-map.component.html',
  styleUrls: ['./driver-map.component.scss']
})
export class DriverMapComponent implements OnInit {

  constructor(private station:StationService, private _acr : ActivatedRoute) { }
  center!: google.maps.LatLngLiteral
  stationList!:StationRoute[] | null;
  ngOnInit(): void {
    this.initMap()
  }
   initMap(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 6,
        center: { lat: this.center.lat, lng:this.center.lng,},
      }
    );
  
    directionsRenderer.setMap(map);
  
    (document.getElementById("submit") as HTMLElement).addEventListener(
      "click",
      () => {
        this.calculateAndDisplayRoute(directionsService, directionsRenderer);
      }
    );
  });
   }
  
  calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
  ) {
    const waypts: google.maps.DirectionsWaypoint[] = [];
    // const checkboxArray = document.getElementById(
    //   "waypoints"
    // ) as HTMLSelectElement;
  
    // for (let i = 0; i < checkboxArray.length; i++) {
    //   if (checkboxArray.options[i].selected) {
    //     waypts.push({
    //       location: (checkboxArray[i] as HTMLOptionElement).value,
    //       stopover: true,
    //     });
    //   }
    // }
    this.stationList= this.station.stationList;
    this.stationList.forEach((s,i)=>{
      waypts.push({
        location:{lat: ()=>s.pointX, lng:()=>s.pointY}, 
        stopover: true,
      });
    })
   
  
    directionsService
      .route({
        origin: (document.getElementById("start") as HTMLInputElement).value,
        destination: (document.getElementById("end") as HTMLInputElement).value,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
  
        const route = response.routes[0];
        const summaryPanel = document.getElementById(
          "directions-panel"
        ) as HTMLElement;
  
        summaryPanel.innerHTML = "";
  
        // For each route, display summary information.
        for (let i = 0; i < route.legs.length; i++) {
          const routeSegment = i + 1;
  
          summaryPanel.innerHTML +=
            "<b>Route Segment: " + routeSegment + "</b><br>";
          summaryPanel.innerHTML += route.legs[i].start_address + " to ";
          summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
          summaryPanel.innerHTML += route.legs[i].distance!.text + "<br><br>";
        }
      })
      .catch((e) => window.alert("Directions request failed due to " + e));
  }

}
