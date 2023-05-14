import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { JobsearchingsComponent } from './jobsearchings/jobsearchings.component';
import { JobsearchingComponent } from './jobsearching/jobsearching.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RouterModule } from '@angular/router';

import { AppRouter } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { AddJobComponent } from './add-job/add-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    JobsearchingsComponent,
    JobsearchingComponent,
    NavigationComponent,
    ErrorPageComponent,
    AddJobComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRouter)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
