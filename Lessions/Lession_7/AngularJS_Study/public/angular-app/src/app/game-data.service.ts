import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

import { Game } from "./games/games.component";

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  private _baseUrl = "http://localhost:3000/api/";

  constructor(private _http:HttpClient) {}

  public getAll(offset: number, count: number, keySearch: string):Observable<Game[]> {
    let url: string;
    if (keySearch) {
      url = this._baseUrl + "games?offset=" + offset + "&count=" + count + "&keySearch=" + keySearch;
    } else {
      url = this._baseUrl + "games?offset=" + offset + "&count=" + count;
    }
    return this._http.get<Game[]>(url);
  }

  public getOne(gameId: string): Observable<Game> {
    const url: string = this._baseUrl + "games/" + gameId;
    return this._http.get<Game>(url);
  }

  public deleteOne(gameId: string): Observable<void> {
    const url: string = this._baseUrl + "games/" + gameId;
    return this._http.delete<void>(url);
  }

  public addOne(newGame: any): Observable<Game> {
    const url: string = this._baseUrl + "games";
    return this._http.post<Game>(url, newGame);
  }

  public partialUpdateOne(gameId:string, game: any): Observable<Game> {
    const url: string = this._baseUrl + "games/" + gameId;
    console.log(url);
    return this._http.patch<Game>(url, game);
  }

  public fullUpdateOne(gameId:string, game: any): Observable<Game> {
    const url: string = this._baseUrl + "games/" + gameId;
    console.log(url);
    return this._http.put<Game>(url, game);
  }

}
