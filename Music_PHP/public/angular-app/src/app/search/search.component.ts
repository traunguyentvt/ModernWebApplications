import { Component } from '@angular/core';

import { Song } from '../songs/songs.component';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  songs: Song[] = [];
  offset: number = 0;
  limitArray: number[] = [5, 10, 20, 25, 50];
  currentCount: number = this.limitArray[0];
  keySearch!: string;
  isEndedPage: boolean = true;
  sort: number = 0;
  lblSort:string = "Sort"

  constructor(private _musicService: MusicDataService) {}

  ngOnInit() {
    // if (this._route.snapshot.queryParams["keySearch"]) {
    //   this.keySearch = this._route.snapshot.queryParams["keySearch"];
    // } else {
    //   this.keySearch = "";
    // }
    this.loadSongs();
  }

  loadSongWithOffset(offset: number) {
    this.offset = offset;
    this.loadSongs();
  }

  onPaginate(offset: number) {
    this.loadSongWithOffset(offset);
  }

  onLimitChange() {
    this.loadSongWithOffset(0);
  }

  onInputChange() {
  //   this.setKeySearcQuery();
    this.loadSongWithOffset(0);
  }

  onSearch() {
  //   this.setKeySearcQuery();
    this.loadSongWithOffset(0);
  }

  onSort() {
    if (1 == this.sort) {
      this.sort = 0;
      this.lblSort = "Sort";
    } else {
      this.sort = 1;
      this.lblSort = "unSort";
    }
    this.loadSongWithOffset(0);
  }

  // setKeySearcQuery() {
  //   this._router.navigate([], {
  //     relativeTo: this._route,
  //     queryParams: {keySearch:this.keySearch},
  //     queryParamsHandling: "merge"
  //   });
  // }

  loadSongs() {
    if (!this.keySearch) {
      this.songs = [];
      return;
    }

    this._musicService.getAll(this.offset, this.currentCount, this.keySearch, this.sort).subscribe({
      next: (songs) => this.fillSongs(songs),
      error: (error) => this.handleError(error),
      complete: () => {}
    });
  }

  updateEndedPage(count: number) {
    if (count >= this.currentCount) {
      this.isEndedPage = false;
    } else {
      this.isEndedPage = true;
    }
  }

  displayDuration(song: Song): string {
    const duration = song.duration;
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - (hours * 3600)) / 60);
    const seconds = duration - (hours * 3600) - (minutes * 60);

    let result = "";
    if (hours > 0) {
      result = hours.toString().padStart(2, "0") + ":";
    }
    return result + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
  }

  getSongIndex(index:number) {
    return this.offset*this.currentCount + index;
  }

  private fillSongs(songs: Song[]) {
    this.songs = songs;
    this.updateEndedPage(songs.length);
  }

  private handleError(error: Error) {
    console.log(error);
  }
  
}
