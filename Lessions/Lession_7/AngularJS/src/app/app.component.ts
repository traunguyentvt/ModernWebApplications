import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularJS';

  people = ["vt", "aye", "vt"];

  students = [{name:"vt", type:"aye"}, {name:"tt", type:"me"}];

  btnTitle = "VT";

  today = new Date();

  onClickBtn() {
    this.btnTitle = "AYE VT";
  }

}
