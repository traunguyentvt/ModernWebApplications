import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-starts-rating',
  templateUrl: './starts-rating.component.html',
  styleUrls: ['./starts-rating.component.css']
})
export class StartsRatingComponent {

  @Input()
  rating!: number;

  stars!: number[];

  ngOnChanges(change: SimpleChanges):void {
    this.stars = new Array<number>(this.rating);
  }

}
