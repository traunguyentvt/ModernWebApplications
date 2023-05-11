import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

import { Game } from "./games/games.component";

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  private _baseUrl = "http://localhost:3000/api/";

  constructor(private _http:HttpClient) { }

  public getAll():Observable<Game[]> {
    const url: string = this._baseUrl + "games";
    return this._http.get<Game[]>(url);
  }

  public getOne(gameId: string):Observable<Game> {
    const url: string = this._baseUrl + "games/" + gameId;
    return this._http.get<Game>(url);
  }

  public deleteOne(gameId: string):Observable<void> {
    const url: string = this._baseUrl + "games/" + gameId;
    return this._http.delete<void>(url);
  }

}
