import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MusicDataService } from '../music-data.service';
import { Artist, Song } from '../songs/songs.component';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent {

  song: Song = new Song("", "", 0);

  constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _musicService: MusicDataService) {}

  ngOnInit() {
    this.loadSong();
  }

  onDelete() {
    if (confirm("Do you want to delete " + this.song.title + "?")) {
      this._musicService.deleteOne(this.song._id).subscribe({
        next: (any) => {
          alert("Delete successfully!");
          this._router.navigate(["songs"]);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
  
        }
      });
    }
  }

  onUpdate() {
    const songId = this.song._id;
    this._router.navigate(["updatesong/" + songId]);
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

  addArtist() {
    // songs/:64572880029c211f625703cd/updateArtist/:artistId
    this._router.navigate(["addArtist/" + this.song._id]);
  }

  onArtistRemove(artist:Artist) {
    if (confirm("Do you want to delete " + artist.name + "?")) {
      this._musicService.artistDeleteOne(this.song._id, artist._id).subscribe({
        next: (any) => {
          alert("Delete successfully!");
          this.song.artists.splice(this.song.artists.indexOf(artist), 1);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
  
        }
      });
    }
  }

  onArtistEdit(artist:Artist) {

  }

}
