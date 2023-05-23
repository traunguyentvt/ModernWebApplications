import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TheatersDataService } from '../theaters-data.service';
import { Theater } from '../theaters/theaters.component';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.css']
})
export class TheaterComponent implements OnInit {

  theater:Theater= new Theater({_id: "123", theaterId: "123", location: {address: {street1: "", city: "", state: "", zip: ""}, geo: {}}});
  constructor(private theaterService: TheatersDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const theaterId: string= this.route.snapshot.params["theaterId"];
    this.theaterService.getTheater(theaterId).subscribe({
      next: (theaters) => this.fillTheaterFromService(theaters),
      error: (error) => {console.log(error);}
    });
  }

  private fillTheaterFromService(theater: Theater): void {
    this.theater= theater;
  }

}
