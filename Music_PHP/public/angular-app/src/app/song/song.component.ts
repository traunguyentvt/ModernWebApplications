import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MusicDataService } from '../music-data.service';
import { Artist, Song } from '../songs/songs.component';
import { AuthenticationService } from '../authentication.service';
import { environment } from 'src/environments/environment';
import { Helpers } from '../app.helpers';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent {

  song: Song= new Song();
  get isLoggedIn() {return this._authenticationService.isLoggedIn;}

  constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _musicService: MusicDataService, private _authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loadSong();
  }

  onDelete() {
    if (confirm(environment.MSG_DO_YOU_WANT_TO_DELETE_SPACE + this.song.title + "?")) {
      this._musicService.deleteOne(this.song._id).subscribe({
        next: (song) => this.refreshAfterDeleteSong(),
        error: (error) => this.handleError(error),
        complete: () => {}
      });
    }
  }

  private loadSong() {
    const songId= this._activeRoute.snapshot.params[environment.SONGID];
    this._musicService.getOne(songId).subscribe({
      next: (song) => this.fillSong(song),
      error: (error) => this.handleError(error),
      complete: () => {}
    });
  }

  displayDuration(): string {
    return Helpers.displayDuration(this.song);
  }

  onArtistRemove(artist:Artist) {
    if (confirm(environment.MSG_DO_YOU_WANT_TO_DELETE_SPACE + artist.name + "?")) {
      this._musicService.artistDeleteOne(this.song._id, artist._id).subscribe({
        next: (song) => this.refreshAfterRemoveArtist(artist),
        error: (error) => this.handleError(error),
        complete: () => {}
      });
    }
  }

  private refreshAfterDeleteSong() {
    alert(environment.MSG_DELETE_SUCCESSFULLY);
    this._router.navigate([environment.SONGS]);
  }

  private refreshAfterRemoveArtist(artist: Artist) {
    alert(environment.MSG_DELETE_SUCCESSFULLY);
    this.song.artists.splice(this.song.artists.indexOf(artist), 1);
  }

  private fillSong(song: Song) {
    this.song= song;
  }

  private handleError(error: Error) {
    console.log(error);
  }

}
