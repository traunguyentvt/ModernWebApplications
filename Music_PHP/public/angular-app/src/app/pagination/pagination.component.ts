import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input()
  isEndedPage: boolean = false;
  @Input()
  offset: number = 0;

  @Output()
  addEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {

  }

  onBack() {
    if (this.offset <= 0) {
      return;
    }
    this.offset -= 1;
    this.emitOffset();
  }

  onNext() {
    if (this.isEndedPage) {
      return;
    }
    this.offset += 1;
    this.emitOffset();
  }

  emitOffset() {
    this.addEvent.emit(this.offset);
  }

}
