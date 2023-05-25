import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  get isLoggedIn() {return null != this.token;}

  get token() {
    return localStorage.getItem(environment.TOKEN) as string;
  }

  set token(token:string) {
    localStorage.setItem(environment.TOKEN, token);
  }

  get userProfile() {return this._jwtHelperService.decodeToken(this.token);}

  constructor(private _jwtHelperService: JwtHelperService) { }

  logout() {
    localStorage.clear();
  }
}
