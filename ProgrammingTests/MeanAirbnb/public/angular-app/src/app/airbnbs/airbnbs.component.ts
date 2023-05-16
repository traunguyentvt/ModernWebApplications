import { Component } from '@angular/core';
import { AirbnbServiceService } from '../airbnb-service.service';

export class Location {
  #coordinates!:[number];

  get coordinates() {return this.#coordinates;}

  constructor(coordinates:[number]) {
    this.#coordinates = coordinates;
  }
}

export class Address {
  #_id!:string;
  #street!:string;
  #suburn!:string;
  #country!:string;
  #country_code!:string;
  #location!:Location;

  get _id() {return this.#_id;}
  get street() {return this.#street;}
  get country() {return this.#country;}

  constructor(id:string, country:string) {
    this.#_id = id;
    this.#country = country;
  }

}

export class Airbnb {
  #_id!:string;
  #name!:string;
  #price!:number;
  #address!:Address;
  #house_rules!:string;
  #property_type!:string;
  #cleaning_fee!:number;

  get _id() {return this.#_id;}
  get name() {return this.#name;}
  get price() {return this.#price;}
  get address() {return this.#address;}
  get house_rules() {return this.#house_rules;}
  get property_type() {return this.#property_type;}
  get cleaning_fee() {return this.#cleaning_fee;}

  constructor(id:string, name:string, price:number) {
    this.#_id = id;
    this.#name = name;
    this.#price = price;
  }

}

@Component({
  selector: 'app-airbnbs',
  templateUrl: './airbnbs.component.html',
  styleUrls: ['./airbnbs.component.css']
})
export class AirbnbsComponent {

  airbnbs: Airbnb[] = [];

  constructor(private _airbnbService: AirbnbServiceService) {}

  ngOnInit() {
    this.loadAirbnbs();
  }

  loadAirbnbs() {
    this._airbnbService.getAll().subscribe({
      next: (airbnbs) => {
        this.airbnbs = airbnbs;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }

  onDelete(airbnb: Airbnb) {
    if (confirm("Do you want to delete " + airbnb.name + "?")) {
      this._airbnbService.deleteOne(airbnb._id).subscribe({
        next: (data) => {
          alert("Delete successfully");
          this.loadAirbnbs();
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {

        }
      });
    }
  }

}
