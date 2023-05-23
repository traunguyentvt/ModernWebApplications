import { Component, OnInit } from '@angular/core';
import { Theater } from '../theaters/theaters.component';
import { TheatersDataService } from '../theaters-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  theaters!:Theater[];
  latitude!:number;
  longitude!:number;
  distance!:number;

  constructor(private theaterService:TheatersDataService) { }

  ngOnInit(): void {
  }

  search() {
    this.theaterService.searchTheaters(this.latitude, this.longitude, this.distance).subscribe({
      next: (theaters) => this.fillTheatersFromService(theaters),
      error: (error) => {console.log(error);}
    });
  }

  private fillTheatersFromService(theaters: Theater[]) {   
    this.theaters= theaters;
  }

}
