import { Injectable, NgZone} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import {Observable, Subscription} from "rxjs";
import {GoogleMap, LatLng, Marker} from "@ionic-native/google-maps";

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

  public getChargeString(club: Club): string {

    let currentTime = moment(new Date()).format('H:mm:ss');

    if (currentTime > club.charge_time) {

      return "£" + club.charge_cost

    } else {

      return "Free · £" + club.charge_cost + " after " + club.charge_time;

    }

  }

}

export class Club {

  private _id: number;
  private _count: number;
  private _capacity: number;
  private _charge_time: string;
  private _charge_cost: number;
  private _image: string;
  private _latitude: number;
  private _longitude: number;
  private _name: string;

  private _onChanges: Observable<number>;

  constructor(private http: Http) {

    this._onChanges = Observable.interval(500)
      .flatMap(() => this.http.get("http://10.245.1.242:8000/count/" + this._id))
      .map((response: any) => response.json())
      .startWith(this._count)
      .distinctUntilChanged()

  }

  get id(): number {
    return this._id;
  }

  get count(): number {
    return this._count;
  }

  get capacity(): number {
    return this._capacity;
  }

  get image(): string {
    return this._image;
  }

  get latitude(): number {
    return this._latitude;
  }

  get longitude(): number {
    return this._longitude;
  }

  get name(): string {
    return this._name;
  }

  get charge_time(): string {
    return this._charge_time;
  }

  get charge_cost(): number {
    return this._charge_cost;
  }

  get onChanges(): Observable<number> {
    return this._onChanges;
  }

}

export class CustomGoogleMapMarker extends Marker {

  static size = 80;

  club: Club;
  subscription: Subscription;
  position: LatLng;

  constructor(map: GoogleMap, club: Club) {

    super(map, {});

    this.club = club;
    this.setTitle(this.club.name);
    this.setAnimation("BOUNCE");
    this.position = new LatLng(this.club.latitude, this.club.longitude);

    this.subscription = this.club.onChanges.subscribe((count: number) => {

      this.setIcon(this.generateMarkerIcon(count));

    });

  }

  private generateMarkerIcon(count: number): string {

    let canvas: HTMLCanvasElement = document.createElement("canvas");
    let percent: number = count / this.club.capacity;
    let ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    ctx.canvas.width = CustomGoogleMapMarker.size;
    ctx.canvas.height = CustomGoogleMapMarker.size;
    let cw = CustomGoogleMapMarker.size / 2;
    let ch = CustomGoogleMapMarker.size / 2;
    let diff = percent * Math.PI * 2;

    ctx.clearRect(0, 0, CustomGoogleMapMarker.size, CustomGoogleMapMarker.size);
    ctx.beginPath();
    ctx.arc(cw, ch, CustomGoogleMapMarker.size / 2, 0, 2 * Math.PI, false);

    ctx.fillStyle = '#f4f4f4';
    ctx.fill();
    ctx.strokeStyle = "#e7f2ba";
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    let getStrokeStyle = (percent: number) => {

      if (percent < 0.6) {

        return '#66FF00'

      } else if (percent < 0.8) {

        return '#FFFF00';

      } else {

        return '#FF0000';

      }

    };

    ctx.strokeStyle = getStrokeStyle(percent);

    let offset = -(Math.PI / 2);

    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.lineWidth = 15;
    ctx.font = '10pt verdana';
    ctx.beginPath();

    ctx.lineWidth = CustomGoogleMapMarker.size / 5;
    ctx.arc(cw, ch, CustomGoogleMapMarker.size / 2, offset, diff + offset, false);
    ctx.stroke();
    ctx.fillText(this.club.name, cw, ch);

    return canvas.toDataURL('bas64');

  }

}
