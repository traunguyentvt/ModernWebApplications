import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from './weather-list/weather-list.component';


@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  _baseUrl:string = "http://localhost:3000/api/";

  constructor(private _http: HttpClient) {}

  public getAll():Observable<Weather[]> {
    let url:string = this._baseUrl + "weather";
    return this._http.get<Weather[]>(url);
  }

  public getOne(weatherId:string):Observable<Weather> {
    let url:string = this._baseUrl + "weather/" + weatherId;
    return this._http.get<Weather>(url);
  }

  public deleteOne(weatherId:string):Observable<Object> {
    let url = this._baseUrl + "weather/" + weatherId;
    return this._http.delete<Object>(url);
  }

}
