import { Component } from '@angular/core';

import { MusicDataService } from '../music-data.service';

export class Artist {

  #_id!: string;
  #name!: string;
  #age!: number;

  get _id() {return this.#_id;}
  get name() {return this.#name;}
  get age() {return this.#age;}

  constructor(id:string, name:string, age:number) {
    this.#_id= id;
    this.#name= name;
    this.#age= age;
  }

}

export class Song {

  #_id!: string;
  #title!: string;
  #duration!: number;
  #artists!: [Artist];

  get _id() {return this.#_id;}
  get title() {return this.#title;}
  get duration() {return this.#duration;}
  get artists() {return this.#artists;}

  constructor(id:string, title:string, duration:number) {
    this.#_id= id;
    this.#title= title;
    this.#duration= duration;
  }

}

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent {

  songs: Song[] = [];
  offset: number = 0;
  limitArray: number[] = [5, 10, 20, 25, 50];
  currentCount: number = this.limitArray[0];
  isEndedPage: boolean = true;

  constructor(private _musicService: MusicDataService) {}

  ngOnInit() {
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

  onDelete(song: Song) {
    if (confirm("Do you want to delete " + song.title + "?")) {
      this._musicService.deleteOne(song._id).subscribe({
        next: (response) => this.refreshAfterDeleteSong(song),
        error: (error) => this.handleError(error),
        complete: () => {}
      });
    }
  }

  loadSongs() {
    this._musicService.getAll(this.offset, this.currentCount, "", 0).subscribe({
      next: (songs) => this.fillSongs(songs),
      error: (error) => this.handleError(error),
      complete: () => {}
    });
  }

  refreshAfterDeleteSong(song: Song) {
    alert("Delete successfully!");
      const index = this.songs.indexOf(song);
      this.songs.splice(index, 1);
      this.loadSongs();
  }

  private fillSongs(songs: Song[]) {
    this.songs = songs;
    this.updateEndedPage(songs.length);
  }

  private handleError(error: Error) {
    console.log(error);
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

}
