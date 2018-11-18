import {ChangeDetectorRef, Injectable, NgZone} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LatLng, LatLngBounds, Marker, MarkerIcon} from "@ionic-native/google-maps";
import * as moment from 'moment';
import {Observable} from "rxjs";

@Injectable()
export class ClubProvider {

  clubs: Club[];

  constructor(public http: Http, public ngZone: NgZone) {}



  public getClubs(): Promise<Club[]> {

    if (this.clubs == null) {

      return this.http.get("http://10.245.1.242:8000/all").toPromise()
        .then((response) => response.json())
        .then((clubs: Club[]) => this.clubs = clubs)

    } else {

      return Promise.resolve(this.clubs);

    }
  }

  public setWatch(club: Club, marker: Marker) {

      club.marker = marker;

      Observable.interval(500)
        .flatMap(() => this.http.get("http://10.245.1.242:8000/count/" + club.id))
        .map((response: any) => response.json())
        .startWith(club.count)
        .distinctUntilChanged()
        // .map((count: number) => Math.floor((count / club.capacity) * 100))
        .subscribe(next => {

          console.log(club.name + ": " + next);

          this.ngZone.run(() => club.count = next);

          club.marker.setIcon({url: this.getMarkerImage(club)});

        });

  }


  // Now, I have to update things.

  public getMarkerImage(club: Club) {

    let canvas: HTMLCanvasElement = document.createElement("canvas");
    let percent: number = club.count / club.capacity;
    let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    let size: number = 80;

    ctx.canvas.width = size;
    ctx.canvas.height = size;

    let cw = size / 2;
    let ch = size / 2;
    let diff = percent * Math.PI * 2;

    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.arc(cw, ch, size / 2, 0, 2 * Math.PI, false);

    ctx.fillStyle = '#f4f4f4';
    ctx.fill();
    ctx.strokeStyle = "#e7f2ba";
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    // let img = new Image();
    //
    // img.addEventListener('load', () => {
    //
    //   console.log("Onload event listener trigger");
    //
    //   ctx.drawImage(img, 0, 0, size, size);
    //
    // });
    //
    // img.src = "assets/imgs/hearst_castle.jpg";
    //
    // img.onload = (event) => {
    //
    //   console.log("Onload triggered");
    //
    //   ctx.drawImage(img, 0, 0);
    //
    //
    // };

    // img.src = "assets/icon/favicon.ico";

    //
    //
    if (percent < 0.6) {

      ctx.strokeStyle = '#66FF00'

    } else if (percent < 0.8) {

      ctx.strokeStyle =  '#FFFF00';

    } else {

      ctx.strokeStyle = '#FF0000';

    }

    let offset = - (Math.PI / 2);


    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.lineWidth = 15;
    ctx.font = '10pt verdana';
    ctx.beginPath();

    ctx.lineWidth = size / 5;
    ctx.arc(cw, ch, size / 2, offset, diff + offset, false);

    ctx.stroke();// Stroke function
    //

    // let lines: string[] = this.getLines(ctx, club.name, size - (2 * size / 5));
    //
    // for (let n = 0; n < lines.length; n++) {
    //
    //   ctx.fillText(lines[n], cw, ch + n * 10);
    //
    // }
    //
    // console.log(lines);


    // this.wrapText(ctx, club.name, cw, ch, size - (2 * size / 5), 15);

    ctx.fillText(club.name, cw, ch); //text value & text position

    let base64URL: string = canvas.toDataURL('bas64');

    return base64URL;
  }

  public getLines(ctx, text, maxWidth) {

    let words = text.split(" ");
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {

      let word = words[i];
      let width = ctx.measureText(currentLine + " " + word).width;

      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }

    lines.push(currentLine);

    return lines;
  }

  public wrapText(context, text, x, y, maxWidth, lineHeight) {

      let words = text.split(" ");
      let line = "";

      // Yeah, modify this function. Pass in the centre value.

      for(let n = 0; n < words.length; n++) {

        let testLine = line + words[n] + ' ';
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {

          context.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;

        } else {

          line = testLine;

        }
    }

    context.fillText(line, x, y);

  }


  // Most importantly: my custom radial icon

  public getChargeString(club: Club): string {

    let currentTime = moment(new Date()).format('H:mm:ss');

    if (currentTime > club.charge_time) {

      return "£" + club.charge_cost

    } else {

      return "Free · £" + club.charge_cost + " after " + club.charge_time;

    }

  }

  // Hmmm. Won't quite work. I'd have to generate the marker_icon on update.
  // Presumably I can export the progress bar...? I'm seriously constrained by Google Maps
  // Perhaps the observable isn't being destroyed? Or updated? Or something?

  // public getCapacityPercentage(club: Club): Observable<number> {
  //
  //   return Observable.interval(2000)
  //     .flatMap(() => this.http.get("http://10.245.1.242:8000/count/" + club.id))
  //     .map((response: any) => response.json())
  //     .startWith(club.count)
  //     // .do((value) => console.log(value))
  //     // .do(() => this.ngZone.run(() => {}))
  //     .map((count: number) => Math.floor((count / club.capacity) * 100))
  //     .distinctUntilChanged()
  //     .do((value))
  //
  // }

  // slash/count/id

  public getFurthestPair(): Promise<LatLngBounds> {

    return Promise.resolve(null);

     // return this.getClubs().then(clubs => {
     //
     //   console.log(clubs);
     //
     //   let maxLongitude, minLongitude = clubs[0].longitude;
     //   let maxLatitude, minLatitude = clubs[0].latitude;
     //
     //   clubs.forEach(club => {
     //
     //     if (club.latitude > maxLatitude) maxLatitude = club.latitude;
     //     if (club.latitude < minLatitude) minLatitude = club.latitude;
     //     if (club.longitude > maxLongitude) maxLongitude = club.longitude;
     //     if (club.longitude > minLongitude) minLongitude = club.longitude;
     //
     //   });
     //
     //   console.log(maxLongitude, maxLatitude, minLongitude, minLatitude);
     //
     //   return Promise.resolve(new LatLngBounds([new LatLng(maxLatitude, maxLongitude), new LatLng(minLatitude, minLongitude)]));
     //
     //  });

  }

}

export type Club = {
  capacity: number,
  charge_cost: number,
  charge_time: string,
  count: number,
  id: number,
  image: string,
  latitude: number,
  logo: string,
  longitude: number,
  name: string,
  marker: Marker,
  place_id: string
};
