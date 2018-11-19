import {ChangeDetectorRef, Component} from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Environment
} from '@ionic-native/google-maps';
import {Club, ClubProvider, CustomGoogleMapMarker} from "../../providers/club/club";
import { TinyColor } from '@ctrl/tinycolor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  selectedClub: Club;
  imgSrc: string;


  constructor(public clubProvider: ClubProvider, private changeDetectorRef: ChangeDetectorRef) {

    this.imgSrc = this.generateMarkerIconSVG(25);

  }


  private getColour(percentage) {

      let start = new TinyColor("03C03C").toHsl(),
          end =  new TinyColor("FF0800").toHsl();

      // determine clockwise and counter-clockwise distance between hues
      let distCCW = (start.h >= end.h) ? start.h - end.h : 1 + start.h - end.h,
          distCW = (start.h >= end.h) ? 1 + end.h - start.h : end.h - start.h;

      let h = (distCW <= distCCW) ? start.h + (distCW * percentage) : start.h - (distCCW * percentage);

      if (h < 0) h = 1 + h;
      if (h > 1) h = h - 1;

      let s = (1 - percentage) * start.s + percentage * end.s;
      let l = (1 - percentage) * start.l + percentage * end.l;

      return new TinyColor({h:h, s:s, l:l}).toHexString();

  }

  private generateMarkerIconSVG(count: number): string {

    let capacity = 100;

    // All derived from size, count, and capacity. Nice!
    let size: number = 120;
    let strokeWidth: number = size * 0.1;
    let radius: number = (size / 2) - (strokeWidth / 2);
    let percentage: number = count / capacity;
    let circumference: number = 2 * Math.PI * radius;
    let imageSize: number = 2 * (radius - strokeWidth);

    let colour = this.getColour(percentage);


    let svg: string = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
      `<image xlink:href="assets/icon/favicon.ico" x="${(size - imageSize) / 2}" y="${(size - imageSize) / 2}" height="${imageSize}px" width="${imageSize}px"/>` +
      `<circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none" stroke="#e6e6e6" stroke-width="${strokeWidth}" />` +
      `<circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none" stroke="${colour}" stroke-width="${strokeWidth}" ` +
      `stroke-dasharray="${circumference}" stroke-dashoffset="${circumference * (1 - percentage)}" stroke-linecap="round" transform="rotate(-90 60 60)"/>` +
      `</svg>`;

    // https://codepen.io/xgad/post/svg-radial-progress-meters
    // https://github.com/TypeCtrl/tinycolor
    // https://stackoverflow.com/questions/2593832/how-to-interpolate-hue-values-in-hsv-colour-space
    // http://www.perbang.dk/rgbgradient/

    return svg;

  }

  ionViewDidLoad() {

    // Environment.setEnv({
    //   'API_KEY_FOR_BROWSER_RELEASE': '"AIzaSyBygBnRpARdnUWNBg1NR9Je4yfe2TinpMs"',
    //   'API_KEY_FOR_BROWSER_DEBUG': '"AIzaSyBygBnRpARdnUWNBg1NR9Je4yfe2TinpMs"'
    // });
    //
    // let mapOptions: GoogleMapOptions = {
    //
    //   camera: {
    //     // target: {
    //     //   lat: 54.775997,
    //     //   lng: -1.5740014
    //     // },
    //     zoom: 10,
    //     tilt: 30
    //   },
    //   styles: [
    //     {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    //     //{elementType: 'labels', stylers: [{visibility: 'off'}]},
    //     {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    //     {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    //     {featureType: 'landscape.man_made',
    //       elementType: 'all',
    //       stylers: [{visibility: 'off'}]},
    //     {
    //       featureType: 'poi',
    //       elementType: 'all',
    //       stylers: [{visibility: 'off'}]
    //     }, {
    //       featureType: 'road',
    //       elementType: 'geometry',
    //       stylers: [{color: '#38414e'}]
    //     },
    //     {
    //       featureType: 'road',
    //       elementType: 'geometry.stroke',
    //       stylers: [{color: '#212a37'}]
    //     },
    //     {
    //       featureType: 'road',
    //       elementType: 'labels.text.fill',
    //       stylers: [{color: '#9ca5b3'}]
    //     },
    //     {
    //       featureType: 'road.highway',
    //       elementType: 'geometry',
    //       stylers: [{color: '#746855'}]
    //     },
    //     {
    //       featureType: 'road.highway',
    //       elementType: 'geometry.stroke',
    //       stylers: [{color: '#1f2835'}]
    //     },
    //     {
    //       featureType: 'road.highway',
    //       elementType: 'labels.text.fill',
    //       stylers: [{color: '#f3d19c'}]
    //     },
    //     {
    //       featureType: 'transit',
    //       elementType: 'geometry',
    //       stylers: [{color: '#2f3948'}]
    //     },
    //     {
    //       featureType: 'transit.station',
    //       elementType: 'labels.text.fill',
    //       stylers: [{color: '#d59563'}]
    //     },
    //     {
    //       featureType: 'water',
    //       elementType: 'geometry',
    //       stylers: [{color: '#17263c'}]
    //     },
    //     {
    //       featureType: 'water',
    //       elementType: 'labels.text.fill',
    //       stylers: [{color: '#515c6d'}]
    //     },
    //     {
    //       featureType: 'water',
    //       elementType: 'labels.text.stroke',
    //       stylers: [{color: '#17263c'}]
    //     }
    //   ],
    //   controls: {
    //     myLocation: true,
    //   },
    //   preferences: {
    //     building: false,
    //     buildings: false
    //   }
    //
    // };
    // this.map = GoogleMaps.create('map_canvas', mapOptions);
    //
    // this.map.getMyLocation({enableHighAccuracy: true})
    //   .then((location) => this.map.setCameraTarget(location.latLng))
    //   .then(() => this.clubProvider.getClubs())
    //   .then((clubs: Club[]) => {
    //
    //     clubs.forEach(club => {
    //
    //       let marker: CustomGoogleMapMarker = new CustomGoogleMapMarker(this.map, club);
    //
    //       this.map.addMarkerSync(marker);
    //
    //       marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //
    //         this.selectedClub = club;
    //
    //         this.changeDetectorRef.detectChanges();
    //
    //       });
    //
    //     });
    //
    //   });
    //
  }

}
