import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input()
  isEndedPage: boolean= environment.DEFAULT_FALSE;
  @Input()
  offset: number= environment.ZERO;

  @Output()
  addEvent: EventEmitter<number>= new EventEmitter<number>();

  constructor() {}

  ngOnInit() {

  }

  onBack() {
    if (this.offset <= environment.ZERO) {
      return;
    }
    this.offset-= 1;
    this.emitOffset();
  }

  onNext() {
    if (this.isEndedPage) {
      return;
    }
    this.offset+= 1;
    this.emitOffset();
  }

  emitOffset() {
    this.addEvent.emit(this.offset);
  }

}
