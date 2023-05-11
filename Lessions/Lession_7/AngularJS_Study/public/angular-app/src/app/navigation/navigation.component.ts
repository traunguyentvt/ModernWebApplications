import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private _router : Router) {} //create _router as variable and pass this value into this class

  onHome() {
    this._router.navigate([""]);
  }

  onGames() {
    this._router.navigate(["games"]);
  }

  onRegister() {
    console.log("onRegister");
  }

}
