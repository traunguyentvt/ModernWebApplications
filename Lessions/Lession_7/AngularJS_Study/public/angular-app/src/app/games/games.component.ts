import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { ActivatedRoute, Router } from '@angular/router';

export class Location {
  #coordinates!: [number];
  get coordinates() { return this.#coordinates; }

  constructor(coordinates:[number]) {
    this.#coordinates = coordinates;
  }

}

export class Publisher {

  #_id!: string;
  #name!: string;
  #country!: string;
  #established!: number;
  #location!: Location;

  get _id() { return this.#_id; }
  get name() { return this.#name; }
  set name(name: string) {this.#name= name;}
  get country() {return this.#country;}
  get established() {return this.#established;}
  get location() {return this.#location;}

  constructor(id: string, name: string, country: string, established:number) {
    this.#_id= id;
    this.#name= name;
    this.#country= country;
    this.#established= established;
  }

}

export class Review {

  #_id!: string;
  #title!: string;
  #rating!: number;
  #review!: string;

  get _id() { return this.#_id; }
  get title() { return this.#title; }
  get review() { return this.#review; }
  set review(review: string) {this.#review= review;}
  get rating() {return this.#rating;}

  constructor(id: string, title: string, rating: number, review:string) {
    this.#_id= id;
    this.#title= title;
    this.#rating= rating;
    this.#review= review;
  }

}

export class Game {

  #_id!: string;
  #title!: string;
  #year!: string;
  #rate!: number;
  #price!: number;
  #minPlayers!: number;
  #maxPlayers!: number;
  #minAge!: number;
  #designers!: [string];
  #publisher!: Publisher;
  #reviews!: [Review];

  get _id() { return this.#_id; }
  get title() { return this.#title; }
  set title(title: string) {this.#title= title;}
  get year() {return this.#year;}
  get rate() {return this.#rate;}
  get price() {return this.#price;}
  set price(price: number) {this.#price= price;}
  get minPlayers() {return this.#minPlayers;}
  get maxPlayers() {return this.#maxPlayers;}
  get minAge() {return this.#minAge;}
  get designers() {return this.#designers;}
  get publisher() {return this.#publisher;}
  get reviews() {return this.#reviews;}
  
  constructor(id: string, title: string, price: number) {
    this.#_id= id;
    this.#title= title;
    this.#price= price;
  }
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[] = [];
  limitArray: number[] = [5, 10, 15, 20, 50, 100, 200];
  currentCount: number = this.limitArray[0];
  keySearch!: string;
  offset: number = 0;
  isEndedPage: number = 0;

  constructor(private _gameService: GameDataService, private _router: Router, private _route: ActivatedRoute) {
  }

  pageChanged() {
    this.offset = 0;
    console.log(this.currentCount, this.keySearch, this.offset);
    this.loadGames();
  }

  onPaginate(offset: number) {
    this.offset = offset;
    console.log(this.currentCount, this.keySearch, this.offset);
    this.loadGames();
  }

  onSearch() {
    console.log(this.currentCount, this.keySearch);
    this._router.navigate(
      [],
      {
        relativeTo: this._route,
        queryParams: { keySearch : this.keySearch},
        queryParamsHandling: "merge"
      }
      );
    this.loadGames();
  }

  searchBoxValueChanged() {
    console.log(this.currentCount, this.keySearch);
    this.loadGames();
  }

  addNewGame() {
    this._router.navigate(["addNewGame"]);
  }

  ngOnInit(): void {
    if (this._route.snapshot.queryParams["keySearch"]) {
      this.keySearch = this._route.snapshot.queryParams["keySearch"];
    }
    this.loadGames();
  }

  loadGames() {
    this._gameService.getAll(this.offset, this.currentCount, this.keySearch).subscribe({
      next: (games) => {
        this.games = games;
        if (games.length >= this.currentCount) {
          this.isEndedPage = 0;
        } else {
          this.isEndedPage = 1;
        }
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
    if (confirm("Do you want to delete " + game.title + "?")) {
      const index = this.games.indexOf(game);
      this._gameService.deleteOne(game._id).subscribe({
      next: () => {
        //option 1: remove  game from the list
        this.games.splice(index, 1);
        //option 2: reload page
        this.loadGames();
        //=> 
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

}
