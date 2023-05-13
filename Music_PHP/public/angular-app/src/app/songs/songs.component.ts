import { Component } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  currentCount: number = this.limitArray[0];
  keySearch!: string;
  isEndedPage: boolean = false;

  constructor(private _musicService: MusicDataService, private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit() {
    if (this._route.snapshot.queryParams["keySearch"]) {
      this.keySearch = this._route.snapshot.queryParams["keySearch"];
    } else {
      this.keySearch = "";
    }
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
    this.setKeySearcQuery();
    this.loadSongWithOffset(0);
  }

  onSearch() {
    this.setKeySearcQuery();
    this.loadSongWithOffset(0);
  }

  setKeySearcQuery() {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {keySearch:this.keySearch},
      queryParamsHandling: "merge"
    });
  }

  addSong() {
    this._router.navigate(["addnewsong"]);
  }

  onDelete(song: Song) {
    if (confirm("Do you want to delete " + song.title + "?")) {
      this._musicService.deleteOne(song._id).subscribe({
        next: (any) => {
          alert("Delete successfully!");
          const index = this.songs.indexOf(song);
          this.songs.splice(index, 1);
          this.loadSongs();
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
  
        }
      });
    }
  }

  loadSongs() {
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
