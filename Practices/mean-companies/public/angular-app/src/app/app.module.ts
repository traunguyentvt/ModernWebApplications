import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './company/company.component';
import { HomeComponent } from './home/home.component';
import { RelationshipsComponent } from './relationships/relationships.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    CompaniesComponent,
    CompanyComponent,
    HomeComponent,
    RelationshipsComponent,
    ErrorPageComponent,
    PaginationComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "companies",
        component: CompaniesComponent
      },
      {
        path: "companies/:companyId",
        component: CompanyComponent
      },
      {
        path: "companies/:companyId/relationships",
        component: RelationshipsComponent
      },
      {
        path:"search",
        component: SearchPageComponent
      },
      {
        path:"**",
        component: ErrorPageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
