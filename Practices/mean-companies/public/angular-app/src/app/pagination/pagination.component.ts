import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input()
  offset:number = 0;
  @Input()
  isEndedPage:boolean = false;

  @Output()
  addEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPrevious() {
    if (this.offset <= 0) {
      return;
    }
    this.offset -= 1;
    this.addEvent.emit(this.offset);
  }

  onNext() {
    if (this.isEndedPage) {
      return;
    }
    this.offset += 1;
    this.addEvent.emit(this.offset);
  }

}
