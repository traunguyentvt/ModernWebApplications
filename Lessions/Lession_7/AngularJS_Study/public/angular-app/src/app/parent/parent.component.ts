import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {

  parentX: number = 7;
  parentY: number = 9;
  parentZ: number = 0;

  public add(msg: number) {
    this.parentZ = msg;
  }

}
