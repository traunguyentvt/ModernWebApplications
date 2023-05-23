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
        next: (song) => this.refreshAfterDeleteSong(),
        error: (error) => this.handleError(error),
        complete: () => {}
      });
    }
  }

  loadSong() {
    const songId = this._activeRoute.snapshot.params["songId"];
    this._musicService.getOne(songId).subscribe({
      next: (song) => this.fillSong(song),
      error: (error) => this.handleError(error),
      complete: () => {}
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
  }

  onArtistRemove(artist:Artist) {
    if (confirm("Do you want to delete " + artist.name + "?")) {
      this._musicService.artistDeleteOne(this.song._id, artist._id).subscribe({
        next: (song) => this.refreshAfterRemoveArtist(artist),
        error: (error) => this.handleError(error),
        complete: () => {}
      });
    }
  }

  refreshAfterDeleteSong() {
    alert("Delete successfully!");
    this._router.navigate(["songs"]);
  }

  refreshAfterRemoveArtist(artist: Artist) {
    alert("Delete successfully!");
    this.song.artists.splice(this.song.artists.indexOf(artist), 1);
  }

  private fillSong(song: Song) {
    this.song = song;
  }

  private handleError(error: Error) {
    console.log(error);
  }

}
