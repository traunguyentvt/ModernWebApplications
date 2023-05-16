import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Airbnb } from './airbnbs/airbnbs.component';

@Injectable({
  providedIn: 'root'
})
export class AirbnbServiceService {

  _baseUrl:string = "http://localhost:3000/api/";

  constructor(private _http:HttpClient) {}

  public getAll():Observable<Airbnb[]> {
    const url = this._baseUrl + "airbnbs";
    return this._http.get<Airbnb[]>(url);
  }

  public getOne(airbnbId:string):Observable<Airbnb> {
    const url = this._baseUrl + "airbnbs/" + airbnbId;
    return this._http.get<Airbnb>(url);
  }

  public deleteOne(airbnbId:string):Observable<Airbnb> {
    const url = this._baseUrl + "airbnbs/" + airbnbId;
    return this._http.delete<Airbnb>(url);
  }

}
