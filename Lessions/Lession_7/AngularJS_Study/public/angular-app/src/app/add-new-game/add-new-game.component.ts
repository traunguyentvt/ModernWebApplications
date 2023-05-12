import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GameDataService } from '../game-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-add-new-game',
  templateUrl: './add-new-game.component.html',
  styleUrls: ['./add-new-game.component.css']
})
export class AddNewGameComponent {

  btnTitle: string = "Add New Game";
  existedGame!: Game;
  newGameForm!: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _gameService: GameDataService, private _router: Router, private _route: ActivatedRoute) {

  }

  ngOnInit() {
    this.newGameForm = new FormGroup({
      title: new FormControl(),
      rate: new FormControl(),
      year: new FormControl(),
      price: new FormControl(),
      minPlayers: new FormControl(),
      maxPlayers: new FormControl(),
      minAge: new FormControl()
    });

    this.loadGame();
    
  }

  loadGame() {
    const gameId = this._route.snapshot.params["gameId"];
    if (gameId) {
      this.btnTitle = "Edit Game";
      this._gameService.getOne(gameId).subscribe({
        next: (game) => {
          this.existedGame = game;
          this.newGameForm = this._formBuilder.group({
            title: game.title,
            rate: game.rate,
            year: game.year,
            price: game.price,
            minPlayers: game.minPlayers,
            maxPlayers: game.maxPlayers,
            minAge: game.minAge
          });
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log("Completed!");
        }
      });
    }
  }

  addNewGame(form: FormGroup) {
    console.log(form.value);
    if (this.existedGame) {
      this.editGame(form);
      return;
    }
    this.addGame(form);
  }

  addGame(form: FormGroup) {
    this._gameService.addOne(form.value).subscribe({
      next: (game) => {
        this._router.navigate(["games"]);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("Completed!");
      }
    });
  }

  editGame(form: FormGroup) {
    console.log("Edit game");
    this._gameService.partialUpdateOne(this.existedGame._id, form.value).subscribe({
      next: (game) => {
        const link = "/games/" + this.existedGame._id;
        console.log(link);
        this._router.navigate([link]);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("Completed!");
      }
    });
  }

}


