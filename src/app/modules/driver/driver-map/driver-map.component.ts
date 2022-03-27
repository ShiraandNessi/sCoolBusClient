import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { Route } from 'src/app/models/route.model';
import { Station } from 'src/app/models/station.model';
import { StationRoute } from 'src/app/models/stationRoute.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { RouteService } from 'src/app/services/route.service';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-driver-map',
  templateUrl: './driver-map.component.html',
  styleUrls: ['./driver-map.component.scss']
})
export class DriverMapComponent implements OnInit {

  constructor(private route: RouteService, private curr: CurrentUserService, private station: StationService, private _acr: ActivatedRoute) {}
  title = 'my-maps-project';
  zoom = 12
  driver!: Driver;
 waypts: google.maps.DirectionsWaypoint[] = new Array<google.maps.DirectionsWaypoint>();

  resRoute!: Route;
  stationList: StationRoute[]=[];
  center!: google.maps.LatLngLiteral
  markers = [] as any
  directionsService = [] as any
  directionsRenderer = [] as any
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      // navigator.geolocation.getCurrentPosition((position) => {
      //   this.center = {
      //     lat: 31.789877910498564,
      //     lng:35.213321730818194 ,
      //   },
      
        // this.markers[0]={
        //   position: {
        //     lat: this.center.lat,
        //     lng: this.center.lng,
        //   },
        //   label: {
        //     color: 'red',
        //     text: 'you are here',
        //   },
        //   title: 'Family Home ',
        //   options: { animation: google.maps.Animation.BOUNCE },
        // },
      this.directionsService = new google.maps.DirectionsService(),
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 6,
          center: { lat: this.center.lat, lng: this.center.lng },
        }
      );
   
      this.directionsRenderer.setMap(map);
      
      this.curr.getDriver().subscribe(data => {
        this.driver = data,
          this.route.getRouteByDriverId(this.driver.id).subscribe(data => {
            this.resRoute = data,
              this.station.getStationByRouteId(this.resRoute.id).subscribe(data => {
                this.stationList = data,
                  this.stationList.forEach((s,i) => {
                   this. waypts.push({
                      location: new google.maps.LatLng(31.82321793816458, 35.19240911920125),
                      stopover: true
                    }); 
                   
                      let location=new google.maps.LatLng(31.82321793816458, 35.19240911920125)
                    
                    console.log("jjjj",this.waypts[0],location)
                  })
                  
              })
          })
      });})
    }
      // waypts[0]= ({
      //   location: new google.maps.LatLng(this.stationList[0].pointX, this.stationList[0].pointY),
      //   stopover: true,
      // });
    // console.log("nnn", waypts,
    //     "cc", this.stationList,
    //     "ss", new google.maps.LatLng(this.stationList[0].pointY, this.stationList[0].pointX),
    //   )


  //     this.directionsService.route({
  //         origin: { lat: this.stationList[0].pointX, lng: this.stationList[0].pointX },
  //         destination: { lat: this.stationList[1].pointX, lng: this.stationList[1].pointX },
  //         // waypoints: waypts,
  //         // optimizeWaypoints: true,
  //         travelMode: google.maps.TravelMode.DRIVING,
  //       })
  //       .then((response: { routes: any[]; }) => {
  //         this.directionsRenderer.setDirections(response);

  //         const route = response.routes[0];

  //       })
  //       .catch((e: string) => window.alert("Directions request failed due to " + e));
  //     console.log("dd", this.directionsService.route.origin)
  //   })

  // }

  // calculateAndDisplayRoute(
  //   directionsService: google.maps.DirectionsService,
  //   directionsRenderer: google.maps.DirectionsRenderer
  // ) {
  //   const waypts: google.maps.DirectionsWaypoint[] = [];
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
    // this.stationList = this.station.stationList;
    // this.stationList.forEach(s => {
    //   waypts.push({
    //     location: new google.maps.LatLng(s.pointX, s.pointY),
    //     stopover: true,
    //   });
    // })

    // directionsService.route({
    //   origin: this.center,
    //   destination: new google.maps.LatLng(this.stationList[3].pointX, this.stationList[3].pointY),
    //   waypoints: waypts,
    //   optimizeWaypoints: true,
    //   travelMode: google.maps.TravelMode.DRIVING,
    // })
    //   .then((response) => {
    //     directionsRenderer.setDirections(response);

    //     const route = response.routes[0];
        // const summaryPanel = document.getElementById(
        //   "directions-panel"
        // ) as HTMLElement;

        // summaryPanel.innerHTML = "";

        // For each route, display summary information.
        // for (let i = 0; i < route.legs.length; i++) {
        //   const routeSegment = i + 1;

        //   summaryPanel.innerHTML +=
        //     "<b>Route Segment: " + routeSegment + "</b><br>";
        //   summaryPanel.innerHTML += route.legs[i].start_address + " to ";
        //   summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
        //   summaryPanel.innerHTML += route.legs[i].distance!.text + "<br><br>";
        // // }
        // console.log("nnn", waypts)
      // })
      // .catch((e) => window.alert("Directions request failed due to " + e));
  

}

