import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { MusicDataService } from '../music-data.service';
import { Artist, Song } from '../songs/songs.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
})
export class AddArtistComponent {

  song: Song= new Song();
  artistForm!: FormGroup;
  artist!: Artist;
  currentArtist: Artist = new Artist();
  lblTitle: string= environment.ADD_ARTIST;
  successMessage: string= environment.EMPTY_STRING;
  errorMessage: string= environment.EMPTY_STRING;
  isSuccess: boolean= environment.DEFAULT_FALSE;
  isError: boolean= environment.DEFAULT_FALSE;

  constructor(private _musicService: MusicDataService, private _route:ActivatedRoute, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.loadSong();
  }

  private initForm() {
    this.artistForm= new FormGroup({
      name: new FormControl(),
      age: new FormControl()
    });
  }

  loadSong() {
    const songId= this._route.snapshot.params[environment.SONGID];

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
    if (!this.validate()) {
      return;
    }

    if (this.artist) {
      this.onUpdateArtist();
      return;
    }
    this.onCreateArtist();
  }

  onUpdateArtist() {
    this.currentArtist.fillArtistFromRelativeForm(this.artistForm);
    this._musicService.fullArtistUpdateOne(this.song._id, this.artist._id, this.currentArtist).subscribe({
      next:(song) => this.updateArtistSuccess(),
      error:(error) => this.onMessageError(environment.MSG_FAILED_TO_UPDATE_ARTIST, error),
      complete:() => {}
    });
  }

  onCreateArtist() {
    this.currentArtist.fillArtistFromRelativeForm(this.artistForm);
    this._musicService.artistAddOne(this.song._id, this.currentArtist).subscribe({
      next:(song) => this.createArtistSuccess(),
      error:(error) => this.onMessageError(environment.MSG_FAILED_TO_ADD_ARTIST, error),
      complete:() => {}
    });
  }

  private updateArtistSuccess() {
    this.updateSuccessMessage(environment.MSG_YOUR_ARTIST_HAS_BEEN_UPDATED);
  }

  private createArtistSuccess() {
    this.currentArtist.resetValue();
    this.initForm();
    this.updateSuccessMessage(environment.MSG_YOUR_ARTIST_HAS_BEEN_CREATED);
  }

  private fillSong(song: Song) {
    this.song= song;
    const artistId= this._route.snapshot.params[environment.ARTISTID];
    if (artistId) {
      const artistFlter= song.artists.filter(item => item._id == artistId);
      if (artistFlter) {
        this.artist= artistFlter[0];
        this.artistForm= this._formBuilder.group({
          name: this.artist.name,
          age: this.artist.age
        });
        this.lblTitle= environment.UPDATE_ARTIST;
      }
    }
  }
  
  private handleError(error: Error) {
    console.log(error);
  }

  onInputChange() {
    // this.resetMessage();
  }

  // private resetMessage() {
  //   this.successMessage= environment.EMPTY_STRING
  //   this.isSuccess= environment.DEFAULT_FALSE;
  //   this.errorMessage= environment.EMPTY_STRING
  //   this.isError= environment.DEFAULT_FALSE;
  // }

  private onMessageError(message: string, error: HttpErrorResponse) {
    console.log(error);

    let error_message = message;
    if (error && error.error && error.error.message) {
      error_message = error.error.message;
    }
    this.updateErrorMessage(error_message);
  }

  private updateErrorMessage(message: string) {
    this.successMessage= environment.EMPTY_STRING;
    this.isSuccess= environment.DEFAULT_FALSE;
    this.errorMessage= message;
    this.isError= environment.DEFAULT_TRUE;
  }

  private updateSuccessMessage(message: string) {
    this.successMessage= message;
    this.isSuccess= environment.DEFAULT_TRUE;
    this.errorMessage= environment.EMPTY_STRING;
    this.isError= environment.DEFAULT_FALSE;
  }

  private validate(): boolean {
    const name = this.artistForm.value.name;
    const age = parseInt(this.artistForm.value.age, 10);
  
    if (!name || !age || isNaN(age) || age < 6 || age > 99) {
      let message = environment.MSG_FAILED_TO_ADD_ARTIST;
      if (this.artist) {
        message = environment.MSG_FAILED_TO_UPDATE_ARTIST;
      }
      this.updateErrorMessage(message);
      return environment.DEFAULT_FALSE;
    }
  
    return environment.DEFAULT_TRUE;
  }

}
