import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { JobAction, Jobopening } from './jobsearchings/jobsearchings.component';

@Injectable({
  providedIn: 'root'
})
export class JobsearchingDataServiceService {

  _baseUrl: string = "http://localhost:3000/api/";

  constructor(private _http: HttpClient) {}

  public getAll(offset:number, count:number, keySearch:string, postDate:any):Observable<Jobopening[]> {
    let url = this._baseUrl + "jobopenings?offset=" + offset + "&count=" + count;
    if (keySearch) {
      url = url + "&keySearch=" + keySearch;
    }
    if (postDate) {
      url = url + "&postDate=" + postDate;
    }
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

  public addActionOne(jobopeningId:string, action:Object):Observable<JobAction> {
    const url = this._baseUrl + "jobopenings/" + jobopeningId + "/actions";
    return this._http.post<JobAction>(url, action);
  }

}
