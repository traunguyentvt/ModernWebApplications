import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';

export class Position {
  #coordinates!:[number];

  get coordinates() {return this.#coordinates;}

  constructor(coordinates:[number]) {
    this.#coordinates = coordinates;
  }
}

export class Wind {
  #direction!:number;
  #speed!:number;

  get direction() {return this.#direction;}
  get speed() {return this.#speed;}

  constructor(direction:number, speed:number) {
    this.#direction = direction;
    this.#speed = speed;
  }
}

export class Weather {
  #_id!:string;
  #st!:string;
  #ts!:string;
  #position!:Position;
  #airTemperature!:number;
  #dewPoint!:number;
  #pressure!:number;
  #wind!:Wind;
  #visibility!:number;
  #precipitationEstimatedObservation!:number;

  get _id() {return this.#_id;}
  get st() {return this.#st;}
  get ts() {return this.#ts;}
  get position() {return this.#position;}
  get airTemperature() {return this.#airTemperature;}
  get dewPoint() {return this.#dewPoint;}
  get pressure() {return this.#pressure;}
  get wind() {return this.#wind;}
  get visibility() {return this.#visibility;}
  get precipitationEstimatedObservation() {return this.#precipitationEstimatedObservation;}

  constructor() {

  }

}

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent {

  currentCount:number = 5;
  offset:number = 0;
  isEndedPage:boolean = false;
  weathers:Weather[] = [];

  constructor(private _weatherService:WeatherServiceService) {}

  ngOnInit() {
    this.loadWeathers();
  }

  loadWeathers() {
    this._weatherService.getAll().subscribe({
      next: (weathers) => {
        this.weathers = weathers;
        if (weathers.length >= this.currentCount) {
          this.isEndedPage = false;
        } else {
          this.isEndedPage = true;
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }


}
