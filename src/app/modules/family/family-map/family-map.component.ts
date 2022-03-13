import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family-map',
  templateUrl: './family-map.component.html',
  styleUrls: ['./family-map.component.scss']
})
export class FamilyMapComponent implements OnInit {
  title = 'my-maps-project';
  zoom = 12
  center!: google.maps.LatLngLiteral
  markers=[] as any
  directionsService =[] as any
  directionsRenderer= [] as any
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      this.markers[0]={
        position: {
          lat: this.center.lat,
          lng: this.center.lng,
        },
        label: {
          color: 'red',
          text: 'you are here',
        },
        title: 'Family Home ',
        options: { animation: google.maps.Animation.BOUNCE },
      },
      this.directionsService = new google.maps.DirectionsService(),
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 6,
          center: { lat: 41.85, lng: -87.65 },
        }
      );
    
      this.directionsRenderer.setMap(map);
    
      (document.getElementById("submit") as HTMLElement).addEventListener(
        "click",
        () => {
          this.calculateAndDisplayRoute(this.directionsService, this.directionsRenderer);
        }
      );
    })
    
  }

  
  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      // options: { animation: google.maps.Animation.BOUNCE },
    })

}

calculateAndDisplayRoute(
  directionsService: google.maps.DirectionsService,
  directionsRenderer: google.maps.DirectionsRenderer
) {
  const waypts: google.maps.DirectionsWaypoint[] = [];
  const checkboxArray = document.getElementById(
    "waypoints"
  ) as HTMLSelectElement;

  for (let i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected) {
      waypts.push({
        location: (checkboxArray[i] as HTMLOptionElement).value,
        stopover: true,
      });
    }
  }

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
zoomIn() {
  // if (this.zoom < this.options.maxZoom |) this.zoom++
}

zoomOut() {
  // if (this.zoom > this.options.minZoom) this.zoom--
}

}
