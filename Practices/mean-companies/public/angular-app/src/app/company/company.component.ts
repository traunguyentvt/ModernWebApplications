import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompaniesDataService } from '../companies-data.service';
import { Company } from '../companies/companies.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  // company:Company= new Company({_id: "123", companyId: "123", location: {address: {street1: "", city: "", state: "", zip: ""}, geo: {}}});
  company:Company= new Company();
  constructor(private companyService: CompaniesDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const companyId: string= this.route.snapshot.params["companyId"];
    
    this.companyService.getCompany(companyId).then(response => this.fillCompanyFromService(response));
  }

  private fillCompanyFromService(company: Company): void {
    
    this.company= company;
  }

}
