import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  get isLoggedIn() {return this._authenticationService.isLoggedIn;}

  constructor(private _authenticationService: AuthenticationService, private _router: Router) {}

  logOut() {
    this._authenticationService.logout();
    this._router.navigate([environment.LOGIN]);
  }

}
