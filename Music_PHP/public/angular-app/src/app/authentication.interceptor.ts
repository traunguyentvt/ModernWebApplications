import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private _authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(this.addAuthenticationToken(request));
    
  }

  addAuthenticationToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const token= this._authenticationService.token;
    if (token) {
      return request.clone({
        setHeaders: {authorization: environment.BEARER_SPACE + token}
      });
    } else {
      return request;
    }
  }
}


