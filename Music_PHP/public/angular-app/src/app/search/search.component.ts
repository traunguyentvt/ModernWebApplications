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
  limitArray: number[] = [5, 10, 20, 50, 100, 200];
  currentCount: number = this.limitArray[0];
  keySearch!: string;
  isEndedPage: boolean = true;

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

    this._musicService.getAll(this.offset, this.currentCount, this.keySearch).subscribe({
      next: (songs) => {
        this.songs = songs;
        this.updateEndedPage(songs.length);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }

  updateEndedPage(count: number) {
    if (count >= this.currentCount) {
      this.isEndedPage = false;
    } else {
      this.isEndedPage = true;
    }
  }
  
}
