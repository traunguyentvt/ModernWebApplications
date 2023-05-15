import { Component, OnInit } from '@angular/core';
import { CompaniesDataService } from '../companies-data.service';

export class Employee {
  #is_past!: Boolean;
  #title!: String;
  #first_name!: String;
  #last_name!: String;

  constructor(employee:any) {
    this.is_past= employee.is_past;
    this.title= employee.title;
    this.first_name= employee.person.first_name;
    this.last_name= employee.person.last_name;
  }

  get is_past() {return this.#is_past;}
  get title() {return this.#title;}
  get first_name() {return this.#first_name;}
  get last_name() {return this.#last_name;}

  set is_past(is_past) {this.#is_past= is_past;}
  set title(title) {this.#title= title;}
  set first_name(first_name) {this.#first_name= first_name;}
  set last_name(last_name) {this.#last_name= last_name;}
}

export class Company {
  #_id!: String;
  #name!: String;
  #permalink!: String;
  #homepage_url!: String;
  #blog_url!: String;
  #blog_feed_url!: String;
  #twitter_username!: String;
  #category_code!: String;
  #number_of_employees!: Number;
  #founded_year!: Number;
  #founded_month!: Number;
  #founded_day!: Number;
  #tag_list!: [String];
  #alias_list!: [String];
  #email_address!: String;
  #phone_number!: String;
  #description!: String;
  //! created_at: 'Fri Aug 10 08:10:15 UTC 2007';
  //! updated_at: 'Fri Mar 15 21:41:04 UTC 2013';
  #overview!: String;
  #relationships!: Employee[];
  #total_money_raised!: Number;
  // #offices!: [officeSchema;

  get _id() {return this.#_id};
  get name() {return this.#name;}
  get permalink() {return this.#permalink;}
  get homepage_url() {return this.#homepage_url;}
  get blog_url() {return this.#blog_url;}
  get blog_feed_url() {return this.#blog_url;}
  get twitter_username() {return this.#twitter_username;}
  get category_code() {return this.#category_code;}
  get number_of_employees() {return this.#number_of_employees;}
  get founded_year() {return this.#founded_year;}
  get founded_month() {return this.#founded_month;}
  get founded_day() {return this.#founded_day;}
  get tag_list() {return this.#tag_list;}
  get alias_list() {return this.#alias_list;}
  get email_address() {return this.#email_address;}
  get phone_number() {return this.#phone_number;}
  get description() {return this.#description;}
  get overview() {return this.#overview;}
  get total_money_raised() {return this.#total_money_raised;}
  get relationships() {return this.#relationships;}
  
  set _id(_id) {this._id= this.#_id;}
  set name(name) {this.name= this.#name;}
  set permalink(permalink) {this.permalink= this.#permalink;}
  set homepage_url(homepage_url) {this.homepage_url= this.#homepage_url;}
  set blog_url(blog_url) {this.blog_url= this.#blog_url;}
  set blog_feed_url(blog_feed_url) {this.blog_feed_url= this.#blog_feed_url;}
  set twitter_username(twitter_username) {this.twitter_username= this.#twitter_username;}
  set category_code(category_code) {this.category_code= this.#category_code;}
  set number_of_employees(number_of_employees) {this.number_of_employees= this.#number_of_employees;}
  set founded_year(founded_year) {this.founded_year= this.#founded_year;}
  set founded_month(founded_month) {this.founded_month= this.#founded_month;}
  set founded_day(founded_day) {this.founded_day= this.#founded_day;}
  set tag_list(tag_list) {this.tag_list= this.#tag_list;}
  set alias_list(alias_list) {this.alias_list= this.#alias_list;}
  set email_address(email_address) {this.email_address= this.#email_address;}
  set phone_number(phone_number) {this.phone_number= this.#phone_number;}
  set description(description) {this.description= this.#description;}
  set overview(overview) {this.overview= this.#overview;}
  set total_money_raised(total_money_raised) {this.total_money_raised= this.#total_money_raised;}
  set relationships(relationships) {this.#relationships= relationships;}
  
}

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies!: Company[];

  constructor(private companyService:CompaniesDataService) { }

  ngOnInit(): void {
    this.companyService.getCompanies().then(response => this.fillCompaniesFromService(response));
  }

  private fillCompaniesFromService(companies: Company[]) {   
    this.companies= companies;
  }

}
