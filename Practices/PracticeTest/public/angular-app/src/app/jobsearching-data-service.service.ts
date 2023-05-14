import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Jobopening } from './jobsearchings/jobsearchings.component';

@Injectable({
  providedIn: 'root'
})
export class JobsearchingDataServiceService {

  _baseUrl: string = "http://localhost:3000/api/";

  constructor(private _http: HttpClient) {}

  public getAll():Observable<Jobopening[]> {
    const url = this._baseUrl + "jobopenings";
    return this._http.get<Jobopening[]>(url);
  }

  public deleteOne(jobopeningId:string):Observable<Object> {
    const url = this._baseUrl + "jobopenings/" + jobopeningId;
    return this._http.delete<Object>(url);
  }

  public getOne(jobopeningId:string):Observable<Jobopening> {
    const url = this._baseUrl + "jobopenings/" + jobopeningId;
    return this._http.get<Jobopening>(url);
  }

  public updateOne(jobopeningId:string, job:Object):Observable<Jobopening> {
    const url = this._baseUrl + "jobopenings/" + jobopeningId;
    return this._http.put<Jobopening>(url, job);
  }

  public addOne(job:Object):Observable<Jobopening> {
    const url = this._baseUrl + "jobopenings";
    return this._http.post<Jobopening>(url, job);
  }

}
