import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
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
        component: RegistrationComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "**",
        component: ErrorPageComponent
    }
];