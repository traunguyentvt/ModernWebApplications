import { Component } from '@angular/core';

import { Song } from '../songs/songs.component';
import { MusicDataService } from '../music-data.service';
import { environment } from 'src/environments/environment';
import { Helpers } from '../app.helpers';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  songs: Song[]= environment.DEFAULT_EMPTY_ARRAY;
  offset: number= environment.ZERO;
  limitArray: number[]= environment.DEFAULT_PAGE_ARRAY;
  currentCount: number= this.limitArray[environment.ZERO];
  keySearch!: string;
  isEndedPage: boolean= environment.DEFAULT_TRUE;
  sort: number= environment.ZERO;
  lblSort:string= environment.SORT;

  constructor(private _musicService: MusicDataService) {}

  ngOnInit() {
    // if (this._route.snapshot.queryParams["keySearch"]) {
    //   this.keySearch = this._route.snapshot.queryParams["keySearch"];
    // } else {
    //   this.keySearch = "";
    // }
    this.loadSongs();
  }

  private loadSongWithOffset(offset: number) {
    this.offset= offset;
    this.loadSongs();
  }

  onPaginate(offset: number) {
    this.loadSongWithOffset(offset);
  }

  onLimitChange() {
    this.loadSongWithOffset(environment.ZERO);
  }

  onInputChange() {
  //   this.setKeySearcQuery();
    this.loadSongWithOffset(environment.ZERO);
  }

  onSearch() {
  //   this.setKeySearcQuery();
    this.loadSongWithOffset(environment.ZERO);
  }

  onSort() {
    const zero= environment.ZERO;
    if (environment.DEFAULT_SORT_VALUE == this.sort) {
      this.sort= zero;
      this.lblSort= environment.SORT;
    } else {
      this.sort= environment.DEFAULT_SORT_VALUE;
      this.lblSort= environment.UN_SORT;
    }
    this.loadSongWithOffset(zero);
  }

  // setKeySearcQuery() {
  //   this._router.navigate([], {
  //     relativeTo: this._route,
  //     queryParams: {keySearch:this.keySearch},
  //     queryParamsHandling: "merge"
  //   });
  // }

  private loadSongs() {
    if (!this.keySearch) {
      this.songs= environment.DEFAULT_EMPTY_ARRAY;
      return;
    }

    this._musicService.getSearchSongs(this.offset, this.currentCount, this.keySearch, this.sort).subscribe({
      next: (songs) => this.fillSongs(songs),
      error: (error) => this.handleError(error),
      complete: () => {}
    });
  }

  private updateEndedPage(count: number) {
    if (count >= this.currentCount) {
      this.isEndedPage= environment.DEFAULT_FALSE;
    } else {
      this.isEndedPage= environment.DEFAULT_TRUE;
    }
  }

  displayDuration(song: Song): string {
    return Helpers.displayDuration(song);
  }

  getSongIndex(index:number) {
    return this.offset*this.currentCount + index;
  }

  private fillSongs(songs: Song[]) {
    this.songs= songs;
    this.updateEndedPage(songs.length);
  }

  private handleError(error: Error) {
    console.log(error);
  }
  
}
