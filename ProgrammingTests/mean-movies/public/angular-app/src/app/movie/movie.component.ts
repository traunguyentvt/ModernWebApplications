import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesDataService } from '../movies-data.service';
import { Movie } from '../movies/movies.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie:Movie= new Movie();
  constructor(private movieService: MoviesDataService, private route: ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {
    const movieId: string= this.route.snapshot.params["movieId"];
    
    this.movieService.getMovie(movieId).subscribe({
      next: (movie)=> this.fillMovie(movie),
      error: (error)=>{this.movie= new Movie(); console.log(error);
      },
    });
  }

  private fillMovie(movie: Movie): void {
    this.movie= movie;
    console.log(this.movie);
  }

  onDelete() {
    if (confirm("Do you want to delete " + this.movie.title + "?")) {
      this.movieService.deleteMovie(this.movie._id).subscribe({
        next: (data) => {
          alert("Delete successfully");
          this._router.navigate(["movies"]);
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
