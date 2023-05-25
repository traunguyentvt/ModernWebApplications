import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SongsComponent } from './songs/songs.component';
import { SongComponent } from './song/song.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppRouter } from './app.routes';
import { PaginationComponent } from './pagination/pagination.component';
import { AddNewSongComponent } from './add-new-song/add-new-song.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { AddArtistComponent } from './add-artist/add-artist.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { environment } from 'src/environments/environment';


const JWT_Module_Options: JwtModuleOptions = {
  config: {
      tokenGetter: localStorage.getItem(environment.TOKEN)?.toString
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SongsComponent,
    SongComponent,
    NavigationComponent,
    LoginComponent,
    ErrorPageComponent,
    PaginationComponent,
    AddNewSongComponent,
    RegisterComponent,
    SearchComponent,
    AddArtistComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(AppRouter),
    JwtModule.forRoot(JWT_Module_Options)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthenticationInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
