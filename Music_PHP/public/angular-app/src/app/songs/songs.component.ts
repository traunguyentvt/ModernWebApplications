import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MusicDataService } from '../music-data.service';
import { environment } from 'src/environments/environment';
import { Helpers } from '../app.helpers';

export class Artist {

  #_id!: string;
  #name!: string;
  #age!: number;

  get _id() {return this.#_id;}
  get name() {return this.#name;}
  get age() {return this.#age;}
  set name(name:string) {this.#name=name;}
  set age(age:number) {this.#age=age;}

  constructor(id:string= environment.EMPTY_STRING, name:string= environment.EMPTY_STRING, age:number= environment.ZERO) {
    this.#_id= id;
    this.#name= name;
    this.#age= age;
  }

  toJSON(): Object {
    return {[environment.NAME]: this.name, [environment.AGE]: this.age};
  }

  fillArtistFromRelativeForm(artistForm: FormGroup) {
    this.name= artistForm.value.name;
    this.age= parseInt(artistForm.value.age, 10);
  }

  resetValue() {
    this.name = environment.EMPTY_STRING;
    this.age = environment.ZERO;
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
  set title(title:string) {this.#title=title;}
  set duration(duration:number) {this.#duration=duration;}
  set artists(artists:[Artist]) {this.#artists=artists;}

  constructor(id:string= environment.EMPTY_STRING, title:string= environment.EMPTY_STRING, duration:number= environment.ZERO) {
    this.#_id= id;
    this.#title= title;
    this.#duration= duration;
  }

  toJSON(): Object {
    return {[environment.TITLE]: this.title, [environment.DURATION]: this.duration};
  }

  fillSongFromRelativeForm(songForm: FormGroup) {
    this.title= songForm.value.title;
    this.duration= parseInt(songForm.value.duration, 10);
  }

  resetValue() {
    this.title = environment.EMPTY_STRING;
    this.duration = environment.ZERO;
  }

}

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent {

  songs: Song[]= environment.DEFAULT_EMPTY_ARRAY;
  offset: number= environment.ZERO;
  limitArray: number[]= environment.DEFAULT_PAGE_ARRAY;
  currentCount: number= this.limitArray[environment.ZERO];
  isEndedPage: boolean= environment.DEFAULT_TRUE;

  constructor(private _musicService: MusicDataService) {}

  ngOnInit() {
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

  onDelete(song: Song) {
    if (confirm(environment.MSG_DO_YOU_WANT_TO_DELETE_SPACE + song.title + "?")) {
      this._musicService.deleteOne(song._id).subscribe({
        next: (response) => this.refreshAfterDeleteSong(song),
        error: (error) => this.handleError(error),
        complete: () => {}
      });
    }
  }

  private loadSongs() {
    this._musicService.getAll(this.offset, this.currentCount).subscribe({
      next: (songs) => this.fillSongs(songs),
      error: (error) => this.handleError(error),
      complete: () => {}
    });
  }

  private refreshAfterDeleteSong(song: Song) {
    alert(environment.MSG_DELETE_SUCCESSFULLY);
      const index= this.songs.indexOf(song);
      this.songs.splice(index, 1);
      this.loadSongs();
  }

  private fillSongs(songs: Song[]) {
    this.songs= songs;
    this.updateEndedPage(songs.length);
  }

  private handleError(error: Error) {
    console.log(error);
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

}
