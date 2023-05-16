import { Component } from '@angular/core';
import { Airbnb } from '../airbnbs/airbnbs.component';
import { AirbnbServiceService } from '../airbnb-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-airbnb',
  templateUrl: './airbnb.component.html',
  styleUrls: ['./airbnb.component.css']
})
export class AirbnbComponent {

  airbnb: Airbnb = new Airbnb("", "", 0);

  constructor(private _airbnbService:AirbnbServiceService, private _route:ActivatedRoute) {}

  ngOnInit() {
    this.loadAirbnb();
  }

  loadAirbnb() {
    const airbnbId = this._route.snapshot.params["airbnbId"];
    this._airbnbService.getOne(airbnbId).subscribe({
      next: (airbnb) => {
        this.airbnb = airbnb;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }

}
