import { Component } from '@angular/core';
import { JobsearchingDataServiceService } from '../jobsearching-data-service.service';


export class Location {
  #_id!: string;
  #name!: string;
  #coordinates!:[number];

  get _id() {return this.#_id;}
  get name() {return this.#name;}
  get coordinates() {return this.#coordinates;}

  constructor(id:string, name:string, coordinates:[number]) {
    this.#_id= id;
    this.#name = name;
    this.#coordinates = coordinates;
  }
}

export class Jobopening {
  #_id!: string;
  #title!: string;
  #salary!: number;
  #location!: Location;
  #description!:string;
  #experience!:string;
  #skills!:string;
  #postDate!:Date;

  get _id() {return this.#_id;}
  get title() {return this.#title;}
  get salary() {return this.#salary;}
  get location() {return this.#location;}
  get description() {return this.#description;}
  get experience() {return this.#experience;}
  get skills() {return this.#skills;}
  get postDate() {return this.#postDate;}

  constructor(id:string, title:string, salary:number, description:string, location:Location, experience:string) {
    this.#_id = id;
    this.#title = title;
    this.#salary = salary;
    this.#description = description;
    this.#location = location;
    this.#experience = experience;
  }
}

@Component({
  selector: 'app-jobsearchings',
  templateUrl: './jobsearchings.component.html',
  styleUrls: ['./jobsearchings.component.css']
})
export class JobsearchingsComponent {

  jobopenings: Jobopening[] = [];
  count: number = 0;
  limit: number = 20;

  constructor(private _jobsearchingService:JobsearchingDataServiceService) {}

  ngOnInit() {
    this.loadJobopenings();
  }

  loadJobopenings() {
    this._jobsearchingService.getAll().subscribe({
      next: (jobopenings) => {
        this.jobopenings = jobopenings;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }

  onDelete(job: Jobopening) {
    if (confirm("Do you want to delete " + job.title + "?")) {
        this._jobsearchingService.deleteOne(job._id).subscribe({
          next: (deletedjob) => {
            alert("Delete " + job.title + " successfully");
            const index = this.jobopenings.indexOf(job);
            this.jobopenings.splice(index, 1);
            this.loadJobopenings();
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {

          }
        });
    }
  }

}
