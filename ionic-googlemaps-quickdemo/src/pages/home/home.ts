import {ChangeDetectorRef, Component} from '@angular/core';
import { ToastController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation, GoogleMapOptions, LatLngBounds, Environment, HtmlInfoWindow
} from '@ionic-native/google-maps';
import {Club, ClubProvider} from "../../providers/club/club";
import {ProgressBarComponent} from "angular-progress-bar";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  selectedClub: Club;
  base64URL: string;

  constructor(public toastCtrl: ToastController, public clubProvider: ClubProvider, private changeDetectorRef: ChangeDetectorRef) {
  }

  ionViewDidLoad() {

    // this.clubProvider.getClubs().then((clubs: Club[]) => {
    //
    //   // this.selectedClub = clubs[2];
    //
    //   this.base64URL = this.clubProvider.getMarkerImage(clubs[0]);
    //
    // });

    this.loadMap();

  }

  loadMap() {

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': '"AIzaSyBygBnRpARdnUWNBg1NR9Je4yfe2TinpMs"',
      'API_KEY_FOR_BROWSER_DEBUG': '"AIzaSyBygBnRpARdnUWNBg1NR9Je4yfe2TinpMs"'
    });

    let mapOptions: GoogleMapOptions = {

      camera: {
        target: {
          lat: 54.775997,
          lng: -1.5740014
        },
        zoom: 18,
        tilt: 30
      },
      styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        //{elementType: 'labels', stylers: [{visibility: 'off'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {featureType: 'landscape.man_made',
          elementType: 'all',
          stylers: [{visibility: 'off'}]},
      {
        featureType: 'poi',
        elementType: 'all',
        stylers: [{visibility: 'off'}]
      }, {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ],
      controls: {
        myLocation: true,
      },
      preferences: {
        building: false,
        buildings: false
      }

    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    this.clubProvider.getClubs().then((clubs: Club[]) => {

      console.log(clubs);

        clubs.forEach(club => {

          // let htmlInfoWindow = new HtmlInfoWindow();
          //
          // let frame: HTMLElement = document.createElement("div");
          //
          // let progressBar = ProgressBarComponent;
          //
          // frame.innerHTML = progressBar.toString();
          //
          // htmlInfoWindow.setContent(progressBar.toString(), {width: "80", height: "80"});


          // frame.innerHTML = '<h3>{{club.name}}</h3>'
          //
          // frame.getElementsByTagName("img")[0].addEventListener("click", () => htmlInfoWindow.setBackgroundColor('red'));
          //
          // htmlInfoWindow.setContent(frame, {
          //   width: "80",
          //   height: "80"
          // });

          // I'd have to output the makrer.

          // Right. I'll just cheat. How hard can it be?


          let marker: Marker = this.map.addMarkerSync({
            title: club.name,
            icon: this.clubProvider.getMarkerImage(club),
            animation: 'DROP',
            position: {
              lat: club.latitude,
              lng: club.longitude
            }
          });

          this.clubProvider.setWatch(club, marker);

          // htmlInfoWindow.open(marker);

          //marker.setIcon()

          //  url?: string;
          //     size?: {
          //         width?: number;
          //         height?: number;
          //     };

          // Need to refresh.

          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {

            this.selectedClub = club;

            this.changeDetectorRef.detectChanges();

          });

        });

    }).then(() => this.clubProvider.getFurthestPair()).then((bounds) => {

      //console.log(bounds.toString());

      //this.map.setCameraTarget(bounds.getCenter())

    });

  }

  onButtonClick() {
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null ,2));

        // What's going wrong?

        // Move the map camera to the location with animation
        this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        })
        .then(() => {
          // add a marker
          let marker: Marker = this.map.addMarkerSync({
            title: '@ionic-native/google-maps plugin!',
            snippet: 'This plugin is awesome!',
            position: location.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });

          // show the infoWindow
          marker.showInfoWindow();

          // If clicked it, display the alert
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            this.showToast('clicked!');
          });
        });
      });
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }
}
