import { environment } from "src/environments/environment";
import { Song } from "./songs/songs.component";

export class Helpers {

    public static displayDuration(song: Song): string {
        const duration= song.duration;
        const hours= Math.floor(duration / 3600);
        const minutes= Math.floor((duration - (hours * 3600)) / 60);
        const seconds= duration - (hours * 3600) - (minutes * 60);
    
        const zero_string: string= environment.ZERO_STRING;
        const collon: string= environment.COLLON;
        const length: number= 2;
        let result= environment.EMPTY_STRING;
        if (hours > environment.ZERO) {
          result= hours.toString().padStart(length, zero_string) + collon;
        }
        return result + minutes.toString().padStart(length, zero_string) + collon + seconds.toString().padStart(length, zero_string);
      }

};