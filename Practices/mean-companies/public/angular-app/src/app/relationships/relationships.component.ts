import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompaniesDataService } from '../companies-data.service';

import { Employee } from '../companies/companies.component';

@Component({
  selector: 'app-relationships',
  templateUrl: './relationships.component.html',
  styleUrls: ['./relationships.component.css']
})
export class RelationshipsComponent implements OnInit {

  employees!: Employee[];
  constructor(private companyService:CompaniesDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const companyId: string= this.route.snapshot.params["companyId"];
    
    this.companyService.getEmployees(companyId).then(response => this.fillEmployeesFromService(response))
  }

  private fillEmployeesFromService(employees: any[]) { 
    this.employees= employees.map((employee) => {
      return new Employee(employee);
    });
  }

}
