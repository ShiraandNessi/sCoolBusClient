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

  constructor(private route: RouteService, private curr: CurrentUserService, private station: StationService, private _acr: ActivatedRoute) { }
  title = 'my-maps-project';
  zoom = 12
  driver!: Driver;
  waypts: google.maps.DirectionsWaypoint[] = new Array<google.maps.DirectionsWaypoint>();
  start = "Bangor, ME";
  finish = "Tampa, FL";
  resRoute!: Route;
  stationList: StationRoute[] = [];
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


        this.markers[0] = {
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
                  this.stationList.forEach((s, i) => {
                  
                    this.waypts.push({
                      location: new google.maps.LatLng(this.stationList[i].pointX, this.stationList[i].pointY).toUrlValue(),
                      stopover: true
                    });
                  
                  }),
                  console.log("new", this.waypts ),
              
                  this.directionsService.route({
                    origin: { lat: this.stationList[0].pointX, lng: this.stationList[0].pointY },
                    destination: { lat: this.stationList[8].pointX, lng: this.stationList[8].pointY },
                    waypoints: this.waypts,
                     optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.DRIVING,
                  })
                    .then((response: { routes: any[]; }) => {
                      console.log("this.directionsService.route", this.directionsService.route),
                        this.directionsRenderer.setDirections(response);

                      const route = response.routes[0];

                    })
                    .catch((e: string) => window.alert("Directions request failed due to " + e));
                console.log("dd", this.directionsService.route.origin)
                
              })

          })
      })
    });

  }

}


