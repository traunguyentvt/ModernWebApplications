import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { MusicDataService } from '../music-data.service';
import { Song } from '../songs/songs.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-new-song',
  templateUrl: './add-new-song.component.html',
  styleUrls: ['./add-new-song.component.css']
})
export class AddNewSongComponent {

  currentSong: Song= new Song();
  existedSong!: Song;
  btnTitle: string= environment.ADD_SONG;
  songForm!: FormGroup;
  successMessage: string= environment.EMPTY_STRING;
  errorMessage: string= environment.EMPTY_STRING;
  isSuccess: boolean= environment.DEFAULT_FALSE;
  isError: boolean= environment.DEFAULT_FALSE;

  constructor(private _formBuilder: FormBuilder, private _route: ActivatedRoute, private _router: Router, private _musicService: MusicDataService) {}

  ngOnInit() {
    this.initForm();
    this.loadSong()
  }

  private initForm() {
    this.songForm= new FormGroup({
      title: new FormControl(),
      duration: new FormControl()
    });

  }

  onSubmit() {
    if (!this.validate()) {
      return;
    }

    if (this.existedSong) {
      this.onUpdateSong();
      return;
    }
    this.onAddSong();
  }

  onUpdateSong() {
    const songId= this.existedSong._id;
    this.currentSong.fillSongFromRelativeForm(this.songForm);
    this._musicService.fullUpdateOne(songId, this.currentSong).subscribe({
      next:(song) => this.updateSongSuccess(songId),
      error:(error) => this.onMessageError(environment.MSG_FAILED_TO_UPDATE_SONG ,error),
      complete:() => {}
    });
  }

  onAddSong() {
    this.currentSong.fillSongFromRelativeForm(this.songForm);
    this._musicService.addOne(this.currentSong).subscribe({
      next:(song) => this.addSongSuccess(song),
      error:(error) => this.onMessageError(environment.MSG_FAILED_TO_ADD_SONG ,error),
      complete:() => {}
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

  private updateSongSuccess(songId: string) {
    alert(environment.MSG_YOUR_SONG_HAS_BEEN_CREATED);
    this._router.navigate([environment.SONGS_SLASH + songId]);
  }

  private addSongSuccess(song: Song) {
    alert(environment.MSG_YOUR_SONG_HAS_BEEN_CREATED);
    this._router.navigate([environment.SONGS_SLASH + song._id]);
  }

  private fillSong(song: Song) {
    this.btnTitle= environment.UPDATE_SONG;
    this.existedSong= song;
    this.songForm= this._formBuilder.group({
      title: song.title,
      duration: song.duration
    });
  }
  
  private handleError(error: Error) {
    console.log(error);
  }

  private onMessageError(message: string, error: HttpErrorResponse) {
    console.log(error);

    let error_message = message;
    if (error && error.error && error.error.message) {
      error_message = error.error.message;
    }
    this.updateErrorMessage(error_message);
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
    const title = this.songForm.value.title;
    const duration = parseInt(this.songForm.value.duration, 10);
  
    if (!title || !duration || isNaN(duration) || duration < 1 || duration > 800) {
      let message = environment.MSG_FAILED_TO_ADD_SONG;
      if (this.existedSong) {
        message = environment.MSG_FAILED_TO_UPDATE_SONG;
      }
      this.updateErrorMessage(message);
      return environment.DEFAULT_FALSE;
    }
  
    return environment.DEFAULT_TRUE;
  }

}
