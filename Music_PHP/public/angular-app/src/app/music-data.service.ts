import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Artist, Song } from './songs/songs.component';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  // private _baseUrl: string= environment.API_BASE_URL;

  constructor(private _http: HttpClient, private _authenticationService: AuthenticationService) {}

  ngOnInit() {

  }

  private _getAllSongs(offset: number, count: number, keySearch: string= environment.EMPTY_STRING, sort: number= environment.ZERO):Observable<Song[]> {
    let url= environment.API_URL_SONGS;
    if (keySearch) {
      url= url + "?offset=" + offset + "&count=" + count + "&keySearch=" + keySearch;
    } else {
      url= url + "?offset=" + offset + "&count=" + count;
    }
    if (environment.DEFAULT_SORT_VALUE == sort) {
      url= url + "&sort=" + sort;
    }
    return this._http.get<Song[]>(url);
  }

  public getSearchSongs(offset: number, count: number, keySearch: string, sort: number):Observable<Song[]> {
    return this._getAllSongs(offset, count, keySearch, sort);
  }

  public getAll(offset: number, count: number):Observable<Song[]> {
    return this._getAllSongs(offset, count);
  }

  public getOne(songId: string):Observable<Song> {
    const url= environment.API_URL_SONGS_SLASH + songId;
    return this._http.get<Song>(url);
  }

  public deleteOne(songId: string):Observable<Song> {
    const url= environment.API_URL_SONGS_SLASH + songId;
    const token = this._authenticationService.token;
    return this._http.delete<Song>(url);
  }

  public addOne(newSong: Song):Observable<Song> {
    const url= environment.API_URL_SONGS;
    return this._http.post<Song>(url, newSong.toJSON());
  }

  public fullUpdateOne(songId: string, song: Song):Observable<Song> {
    const url= environment.API_URL_SONGS_SLASH + songId;
    return this._http.put<Song>(url, song.toJSON());
  }

  public artistAddOne(songId: string, artist: Artist):Observable<Song> {
    const url= environment.API_URL_SONGS_SLASH + songId + environment.API_URL_SLASH_ARTISTS;
    return this._http.post<Song>(url, artist.toJSON());
  }

  public artistDeleteOne(songId: string, artistId: string):Observable<Song> {
    const url= environment.API_URL_SONGS_SLASH + songId + environment.API_URL_SLASH_ARTISTS_SLASH + artistId;
    return this._http.delete<Song>(url);
  }

  public fullArtistUpdateOne(songId: string, artistId: string, artist: Artist):Observable<Song> {
    const url= environment.API_URL_SONGS_SLASH + songId + environment.API_URL_SLASH_ARTISTS_SLASH + artistId;
    return this._http.put<Song>(url, artist.toJSON());
  }

}
