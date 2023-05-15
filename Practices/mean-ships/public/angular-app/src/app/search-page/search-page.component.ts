import { Component, OnInit } from '@angular/core';
import { Ship } from '../ships/ships.component';
import { ShipsDataService } from '../ships-data.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  latitude!:number;
  longitude!:number;
  distance!:number;
  ships: Ship[] = [];

  constructor(private _shipService:ShipsDataService) {}

  ngOnInit(): void {
    this.loadShips();
  }

  onSearch() {
    this.loadShips();
  }

  loadShips() {
    if (!this.latitude || !this.longitude || !this.distance) {
      return;
    }
    this._shipService.searchShips(this.latitude, this.longitude, this.distance).then(response => this.fillShipsFromServer(response));
  }

  fillShipsFromServer(ships:Ship[]) {
    this.ships = ships;
  }

}
