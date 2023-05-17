import { Component, Input, OnInit } from '@angular/core';
import { MoviesDataService } from '../movies-data.service';

export class Movie {
  #_id!: String;
  #title!: String;
  #type!: String;
  #runtime!: Number;
  #year!: Date;
  #plot!: String;
  #rated!:String;
  #genres!:[String];
  #directors!:[String];

  get _id() {return this.#_id;};
  get title() {return this.#title;}
  get type() {return this.#type;}
  get runtime() {return this.#runtime;}
  get year() {return this.#year;}
  get plot() {return this.#plot;}
  get rated(){return this.#rated;}
  get genres(){return this.#genres;}
  get directors() {return this.#directors;}
  
  set _id(_id) {this.#_id= _id;}
  set title(movie) {this.#title= movie;}
  set type(zip) {this.#type= zip;}
  set runtime(pop) {this.#runtime= pop;}
  set year(state) {this.#year= state;}
  set plot(plot) {this.#plot= plot;}
  
  constructor() {
  }
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  limitArray:number[] = [5, 10, 15];
  offset:number = 0;

  @Input()
  count: string = "5";

  currentCount: number = this.limitArray[0];

  isEndedPage:boolean = false;

  movies!: Movie[];

  constructor(private movieService:MoviesDataService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies(this.offset, this.currentCount).subscribe({
      next: (movies)=> this.fillMovies(movies),
      error: (error)=>{this.movies= []; console.log(error);
      },
    });
  }

  private fillMovies(movies: Movie[]) {
    this.movies= movies;
    if (movies.length >= this.currentCount) {
      this.isEndedPage = false;
    } else {
      this.isEndedPage = true;
    }
  }

  onOffsetChange(offset:number) {
    this.offset = offset;
    this.loadMovies();
  }

  onLimitChange() {
    this.offset = 0;
    this.loadMovies();
  }

  onLimit(event:any) {
    this.offset = 0;
    this.currentCount = parseInt(event.target.value);
    console.log(this.currentCount);
    this.loadMovies();
  }

}
