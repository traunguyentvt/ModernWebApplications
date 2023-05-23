import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Theater } from './theaters/theaters.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheatersDataService {
  private apiBaseUrl: string= "http://127.0.0.1:3000/api"

  constructor(private http:HttpClient) { }

  public getTheaters(): Observable<Theater[]> {
    const url: string= this.apiBaseUrl + "/theaters";
    return this.http.get<Theater[]>(url);
    
    // return this.http.get(url).toPromise()
    //             // .then(response => {console.log(response); response as Theater[]})
    //             .catch(this.handleError);
  }

  public searchTheaters(lat:number, lng:number, dis:number): Observable<Theater[]> {
    const url: string= this.apiBaseUrl + "/theaters?lat="+lat+"&lng="+lng+"&dist="+dis;

    return this.http.get<Theater[]>(url);
    
    // return this.http.get(url).toPromise()
    //             // .then(response => {console.log(response); response as Theater[]})
    //             .catch(this.handleError);
  }

  public getTheater(theaterId: string): Observable<Theater> {
    const url: string= this.apiBaseUrl + "/theaters/" + theaterId;

    return this.http.get<Theater>(url);
    
    // return this.http.get(url).toPromise()
    //             // .then(response => {console.log(response); response as Theater})
    //             .catch(this.handleError);
  }

  // private handleError(error: any):Promise<any> {
  //   return Promise.reject(error.message || error);
  // }
}
