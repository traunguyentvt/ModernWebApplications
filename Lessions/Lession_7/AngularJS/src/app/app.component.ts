import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularJS';

  people:string[] = ["tvt", "nvnt", "tvi"];
  students = [{"name":"tv", "age":32}, {"name":"vt", "age":31}, {"name":"aye", age:32}];

  today = new Date();

  onClickBtn() {
    this.title = "Button Clicked"
  }

}
