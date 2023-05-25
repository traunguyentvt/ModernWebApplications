import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './register/register.component';
import { Credential, Token } from './login/login.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  // private _baseUrl: string = environment.API_BASE_URL;

  constructor(private _http: HttpClient) {}

  public register(user: User): Observable<User> {
    const url = environment.API_URL_USERS;
    return this._http.post<User>(url, user.toJSON());
  }

  public login(user: Credential): Observable<Token> {
    const url = environment.API_URL_USERS_LOGIN;
    return this._http.post<Token>(url, user.toJSON());
  }

}
