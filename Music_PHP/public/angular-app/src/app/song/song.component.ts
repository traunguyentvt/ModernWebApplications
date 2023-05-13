import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MusicDataService } from '../music-data.service';
import { Song } from '../songs/songs.component';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent {

  song: Song = new Song("", "", 0);

  constructor(private _activeRoute: ActivatedRoute, private _musicService: MusicDataService) {}

  ngOnInit() {
    this.loadSong();
  }

  loadSong() {
    const songId = this._activeRoute.snapshot.params["songId"];
    this._musicService.getOne(songId).subscribe({
      next: (song) => {
        this.song = song;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }

  displayDuration(): string {
    const duration = this.song.duration;
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - (hours * 3600)) / 60);
    const seconds = duration - (hours * 3600) - (minutes * 60);

    let result = "";
    if (hours > 0) {
      result = hours.toString().padStart(2, "0") + ":";
    }
    return result + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");

    // let myTime = new Date(1, 1, 1);
    // myTime.setSeconds(this.song.duration);
    // return myTime;
  }

}
