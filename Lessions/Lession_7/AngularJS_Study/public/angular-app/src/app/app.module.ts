import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GameComponent } from './game/game.component';
import { AppRoutes } from "./app.routes";
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StartsRatingComponent } from './starts-rating/starts-rating.component';
import { AddNewGameComponent } from './add-new-game/add-new-game.component';
import { PaginationComponent } from './pagination/pagination.component'


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
    HomeComponent,
    GamesComponent,
    ErrorPageComponent,
    GameComponent,
    ParentComponent,
    ChildComponent,
    LoginComponent,
    RegisterComponent,
    StartsRatingComponent,
    AddNewGameComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
