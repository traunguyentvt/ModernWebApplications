import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input()
  offset: number = 0;

  @Input()
  isEndedPage: number = 0;

  @Output()
  addEvent: EventEmitter<number> = new EventEmitter<number>();

  public emitOffset() {
    this.addEvent.emit(this.offset);
  }

  onNext() {
    if (1 == this.isEndedPage) {
      return;
    }
    this.offset += 1;
    this.addEvent.emit(this.offset);
  }

  onBack() {
    if (this.offset <= 0) {
      return;
    }
    this.offset -= 1;
    this.addEvent.emit(this.offset);
  }

}
