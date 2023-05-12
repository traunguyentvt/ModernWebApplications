import { Component, OnInit } from '@angular/core';
import { Game } from "../games/games.component"
import { GameDataService } from '../game-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Game = new Game("", "", 0);

  constructor(private _gameService: GameDataService, private _route: ActivatedRoute, private _router: Router) {}

  editGame() {
    this._router.navigate(["editGame/{{this.game._id}}"]);
  }

  ngOnInit(): void {
    let gameId = this._route.snapshot.params["gameId"];
    this._gameService.getOne(gameId).subscribe({
        next: (game) => {
          this.game = game;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log("Completed!");
        }
      });
  }

  onDelete(game: Game) {
    this._gameService.deleteOne(game._id).subscribe({
      next: () => {
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

}
