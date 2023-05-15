import { Component, OnInit } from '@angular/core';
import { Company } from '../companies/companies.component';
import { CompaniesDataService } from '../companies-data.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {


  offset:number = 0;
  currentCount:number = 5;
  isEndedPage:boolean = false;
  companies:Company[] = [];
  keySearch!:string;

  constructor(private _companyService:CompaniesDataService) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    if (!this.keySearch) {
      this.companies = [];
      return;
    }
    this._companyService.getCompanies(this.offset, this.currentCount, 0, this.keySearch).then(response => this.fillCompaniesFromServices(response));
  }

  fillCompaniesFromServices(companies:Company[]) {
    this.companies = companies;
    if (companies.length >= this.currentCount) {
      this.isEndedPage = false;
    } else {
      this.isEndedPage = true;
    }
  }

  onSearch() {
    this.offset = 0;
    this.loadCompanies();
  }

  onOffsetChange(offset:number) {
    this.offset = offset;
    this.loadCompanies();
  }

}
