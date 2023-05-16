import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AirbnbsComponent } from './airbnbs/airbnbs.component';
import { AirbnbComponent } from './airbnb/airbnb.component';
import { RouterModule } from '@angular/router';
import { AppRouter } from './app.routes';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HomeComponent,
    ErrorPageComponent,
    AirbnbsComponent,
    AirbnbComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(AppRouter)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
