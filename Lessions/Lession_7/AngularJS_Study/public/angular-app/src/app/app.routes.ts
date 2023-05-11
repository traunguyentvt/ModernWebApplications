import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GameComponent } from './game/game.component';
import { ParentComponent } from './parent/parent.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const AppRoutes = [
    {
      path : "",
      component : HomeComponent
    },
    {
      path : "games",
      component : GamesComponent
    },
    {
      path : "games/:gameId",
      component : GameComponent
    },
    {
        path: "parent",
        component: ParentComponent
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
      path : "**",
      component : ErrorPageComponent
    }
  ];