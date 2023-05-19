import { AddArtistComponent } from "./add-artist/add-artist.component";
import { AddNewSongComponent } from "./add-new-song/add-new-song.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { SearchComponent } from "./search/search.component";
import { SongComponent } from "./song/song.component";
import { SongsComponent } from "./songs/songs.component";

export const AppRouter = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "songs",
        component: SongsComponent
    },
    {
        path: "songs/addnewsong",
        component: AddNewSongComponent
    },
    {
        path: "songs/:songId/edit",
        component: AddNewSongComponent
    },
    {
        path: "songs/:songId",
        component: SongComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "search",
        component: SearchComponent
    },
    {
        path: "songs/:songId/addArtist",
        component: AddArtistComponent
    },
    {
        path: "songs/:songId/artists/:artistId/edit",
        component: AddArtistComponent
    },
    {
        path: "**",
        component: ErrorPageComponent
    }
];