import { Component } from '@angular/core';
import { Artist, Song } from '../songs/songs.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
})
export class AddArtistComponent {

  song: Song = new Song("", "", 0);
  artistForm!: FormGroup;
  artist!: Artist;
  lblTitle: string = "Add Artist";

  constructor(private _musicService: MusicDataService, private _route:ActivatedRoute, private _router: Router, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.artistForm = new FormGroup({
      name: new FormControl(),
      age: new FormControl()
    });

    this.loadSong();
  }

  loadSong() {
    const songId = this._route.snapshot.params["songId"];

    if (!songId) {
      return;
    }
    this._musicService.getOne(songId).subscribe({
      next: (song) => this.fillSong(song),
      error: (error) => this.handleError(error),
      complete: () => {}
    });
  }
  
  onSubmit() {
    if (this.artist) {
      this.onUpdateArtist();
      return;
    }
    this.onCreateArtist();
  }

  onUpdateArtist() {
    this._musicService.fullArtistUpdateOne(this.song._id, this.artist._id, this.artistForm.value).subscribe({
      next:(song) => this.updateArtistSuccess(),
      error:(error) => this.handleError(error),
      complete:() => {}
    });
  }

  onCreateArtist() {
    this._musicService.artistAddOne(this.song._id, this.artistForm.value).subscribe({
      next:(song) => this.createArtistSuccess(),
      error:(error) => this.handleError(error),
      complete:() => {}
    });
  }

  private updateArtistSuccess() {
    alert("Your artist has been updated");
    this._router.navigate(["songs/" + this.song._id]);
  }

  private createArtistSuccess() {
    alert("Your artist has been created");
    this._router.navigate(["songs/" + this.song._id]);
  }

  private fillSong(song: Song) {
    this.song = song;
        const artistId = this._route.snapshot.params["artistId"];
        if (artistId) {
          const artistFlter = song.artists.filter(item => item._id == artistId);
          if (artistFlter) {
            this.artist = artistFlter[0];
            this.artistForm = this._formBuilder.group({
              name: this.artist.name,
              age: this.artist.age
            });
            this.lblTitle = "Update Artist";
          }
        }
  }
  
  private handleError(error: Error) {
    console.log(error);
  }

}
