import { Component } from '@angular/core';
import { Song } from '../songs/songs.component';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private _musicService: MusicDataService, private _route:ActivatedRoute, private _router: Router) {}

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
  
  onSubmit() {
    this._musicService.artistAddOne(this.song._id, this.artistForm.value).subscribe({
      next:(song) => {
        alert("Your artist has been created");
        this._router.navigate(["songs/" + this.song._id]);
      },
      error:(error) => {
        console.log(error);
      },
      complete:() => {

      }
    });
  }

}
