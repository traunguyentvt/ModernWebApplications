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
        path: "addnewsong",
        component: AddNewSongComponent
    },
    {
        path: "updatesong/:songId",
        component: AddNewSongComponent
    },
    {
        path: "search",
        component: SearchComponent
    },
    {
        path: "**",
        component: ErrorPageComponent
    }
];