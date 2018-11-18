import {ChangeDetectorRef, Component} from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Environment
} from '@ionic-native/google-maps';
import {Club, ClubProvider, CustomGoogleMapMarker} from "../../providers/club/club";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  selectedClub: Club;

  constructor(public clubProvider: ClubProvider, private changeDetectorRef: ChangeDetectorRef) {}

  ionViewDidLoad() {

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': '"AIzaSyBygBnRpARdnUWNBg1NR9Je4yfe2TinpMs"',
      'API_KEY_FOR_BROWSER_DEBUG': '"AIzaSyBygBnRpARdnUWNBg1NR9Je4yfe2TinpMs"'
    });

    let mapOptions: GoogleMapOptions = {

      camera: {
        // target: {
        //   lat: 54.775997,
        //   lng: -1.5740014
        // },
        zoom: 10,
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

    this.map.getMyLocation({enableHighAccuracy: true})
      .then((location) => this.map.setCameraTarget(location.latLng))
      .then(() => this.clubProvider.getClubs())
      .then((clubs: Club[]) => {

        clubs.forEach(club => {

          let marker: CustomGoogleMapMarker = new CustomGoogleMapMarker(this.map, club);

          this.map.addMarkerSync(marker);

          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {

            this.selectedClub = club;

            this.changeDetectorRef.detectChanges();

          });

        });

      });

  }

}
