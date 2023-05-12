import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './register/register.component';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private _baseUrl = "http://localhost:3000/api/";

  constructor(private _http: HttpClient) {}

  public register(newUser: any): Observable<User> {
    const url: string = this._baseUrl + "users";
    console.log(url);
    return this._http.post<User>(url, newUser);
  }

}
