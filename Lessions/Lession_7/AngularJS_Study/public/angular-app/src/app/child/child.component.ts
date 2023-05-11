import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {

  @Input()
  childX: number = 0;
  @Input()
  childY: number = 0;

  childZ: number = 0;

  @Output()
  addEvent: EventEmitter<number> = new EventEmitter<number>();

  public add() {
    this.updateZValue();
    this.emitZValue();
  }

  private updateZValue() {
    this.childZ = this.childX + this.childY;
  }

  private emitZValue() {
    this.addEvent.emit(this.childZ);
  }

}
