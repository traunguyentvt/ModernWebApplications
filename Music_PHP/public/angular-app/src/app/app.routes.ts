import { environment } from "src/environments/environment";
import { AddArtistComponent } from "./add-artist/add-artist.component";
import { AddNewSongComponent } from "./add-new-song/add-new-song.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";
import { SearchComponent } from "./search/search.component";
import { SongComponent } from "./song/song.component";
import { SongsComponent } from "./songs/songs.component";

export const AppRouter = [
    {
        path: environment.EMPTY_STRING,
        component: HomeComponent
    },
    {
        path: environment.SONGS,
        component: SongsComponent
    },
    {
        path: environment.SONGS_ADDSONG,
        component: AddNewSongComponent
    },
    {
        path: environment.SONGS_SONGID_EDIT,
        component: AddNewSongComponent
    },
    {
        path: environment.SONGS_SONGID,
        component: SongComponent
    },
    {
        path: environment.REGISTER,
        component: RegisterComponent
    },
    {
        path: environment.LOGIN,
        component: LoginComponent
    },
    {
        path: environment.SEARCH,
        component: SearchComponent
    },
    {
        path: environment.PROFILE,
        component: ProfileComponent
    },
    {
        path: environment.SONGS_SONGID_ADDARTIST,
        component: AddArtistComponent
    },
    {
        path: environment.SONGS_SONGID_ARTISTS_ARTISTID_EDIT,
        component: AddArtistComponent
    },
    {
        path: environment.ERROR_STAR,
        component: ErrorPageComponent
    }
];