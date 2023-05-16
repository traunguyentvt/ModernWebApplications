import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Movie } from './movies/movies.component';

@Injectable({
  providedIn: 'root'
})
export class MoviesDataService {
  private apiBaseUrl: string= "http://localhost:3000/api"

  constructor(private http:HttpClient) { }

  public getMovies(offset:number, count:number): Observable<Movie[]> {
    const url: string= this.apiBaseUrl + "/movies?offset=" + offset + "&count=" + count;
    
    return this.http.get<Movie[]>(url);
  }

  public getMovie(movieId: string): Observable<Movie> {
    const url: string= this.apiBaseUrl + "/movies/" + movieId;
    
    return this.http.get<Movie>(url);
  }

  public deleteMovie(movieId:String):Observable<Movie> {
    const url: string = this.apiBaseUrl + "/movies/" + movieId;
    return this.http.delete<Movie>(url);
  }

}
