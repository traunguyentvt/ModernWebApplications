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
  limitArray: number[] = [5, 10, 20, 50, 100, 200];
  limit: number = this.limitArray[3];
  keySearch!: string;

  constructor(private _musicService: MusicDataService) {}

  ngOnInit() {
    this.loadSongs();
  }

  loadSongs() {
    this._musicService.getAll(this.offset, this.limit, this.keySearch).subscribe({
      next: (songs) => {
        this.songs = songs;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }

}
