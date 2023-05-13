import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MusicDataService } from '../music-data.service';
import { Song } from '../songs/songs.component';


@Component({
  selector: 'app-add-new-song',
  templateUrl: './add-new-song.component.html',
  styleUrls: ['./add-new-song.component.css']
})
export class AddNewSongComponent {

  existedSong!: Song;
  btnTitle: string = "Add New Song";
  songForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _route: ActivatedRoute, private _router: Router, private _musicService: MusicDataService) {}

  ngOnInit() {
    this.songForm = new FormGroup({
      title: new FormControl(),
      duration: new FormControl()
    });

    this.loadSong()
  }

  onSubmit() {
    if (this.existedSong) {
      this.onUpdateSong();
      return;
    }
    this.onAddSong();
  }

  onUpdateSong() {
    const songId = this.existedSong._id;
    this._musicService.fullUpdateOne(songId, this.songForm.value).subscribe({
      next:(song) => {
        alert("Your song has been updated");
        this._router.navigate(["songs/" + songId]);
      },
      error:(error) => {
        console.log(error);
      },
      complete:() => {

      }
    });
  }

  onAddSong() {
    this._musicService.addOne(this.songForm.value).subscribe({
      next:(song) => {
        alert("Your song has been created");
        this._router.navigate(["songs/" + song._id]);
      },
      error:(error) => {
        console.log(error);
      },
      complete:() => {

      }
    });
  }

  loadSong() {
    const songId = this._route.snapshot.params["songId"];
    if (!songId) {
      return;
    }
    this._musicService.getOne(songId).subscribe({
      next: (song) => {
        this.btnTitle = "Update Song"
        this.existedSong = song;
        this.songForm = this._formBuilder.group({
          title: song.title,
          duration: song.duration
        });
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }

}
