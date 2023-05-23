import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { User } from './register/register.component';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  _baseUrl: string = "http://localhost:3000/api/";

  constructor(private _http: HttpClient) {}

  public register(user: Object): Observable<User> {
    const url = this._baseUrl + "users";
    return this._http.post<User>(url, user);
  }

  public login(user:Object):Observable<User> {
    const url = this._baseUrl + "users/login";
    return this._http.post<User>(url, user);
  }

}
