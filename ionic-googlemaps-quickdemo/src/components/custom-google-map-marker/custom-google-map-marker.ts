import {Component, Input} from '@angular/core';
import {GoogleMap, GroundOverlay, LatLng} from "@ionic-native/google-maps";
import {Club} from "../../providers/club/club";

/**
 * Generated class for the CustomGoogleMapMarkerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'custom-google-map-marker',
  templateUrl: 'custom-google-map-marker.html'
})
export class CustomGoogleMapMarkerComponent {

  @Input('club') club: Club;
  @Input('map') map: GoogleMap;

  public draw() {

    let div: HTMLElement;

    if (!div) {

      div = document.createElement('div');
      div.className = "marker";
      div.style.position = "absolute";
      div.style.width = "20px";
      div.style.height = "20px";
      div.style.background = "blue";

      div.addEventListener("click", (event) => {

        console.log('Div clicked');


      });

    }


  }



}
