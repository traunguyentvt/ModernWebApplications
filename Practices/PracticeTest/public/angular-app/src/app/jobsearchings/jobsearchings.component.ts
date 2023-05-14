import { Component } from '@angular/core';
import { JobsearchingDataServiceService } from '../jobsearching-data-service.service';

export class JobAction {
  #_id!: string;
  #description! :string;
  #date!: Date;
  #nextStep: string;

  get _id() {return this.#_id;}
  get description() {return this.#description;}
  get date() {return this.#date;}
  get nextStep() {return this.#nextStep;}

  constructor(id:string, nextStep:string, description:string, date:Date) {
    this.#_id = id;
    this.#nextStep = nextStep;
    this.#description = description;
    this.#date = date;
  }

}

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
  #salary!: string;
  #location!: Location;
  #description!:string;
  #experience!:string;
  #skills!:string;
  #postDate!:Date;

  get _id() {return this.#_id;}
  get title() {return this.#title;}
  get salary() {return this.#salary;}
  set salary(salary) {this.#salary = salary};
  get location() {return this.#location;}
  get description() {return this.#description;}
  get experience() {return this.#experience;}
  get skills() {return this.#skills;}
  get postDate() {return this.#postDate;}

  constructor(id:string, title:string, salary:string, description:string, location:Location, experience:string) {
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
  offset: number = 0;
  limitArray: number[] = [5, 10, 15, 20, 25, 50, 100];
  currentCount: number = this.limitArray[0];
  isEndedPage: boolean = false;

  constructor(private _jobsearchingService:JobsearchingDataServiceService) {}

  ngOnInit() {
    this.loadJobopenings();
  }

  onLimitChange() {
    this.offset = 0;
    this.loadJobopenings();
  }

  onOffsetChange(offset:number) {
    this.offset = offset;
    this.loadJobopenings();
  }

  loadJobopenings() {
    this._jobsearchingService.getAll(this.offset, this.currentCount, "", null).subscribe({
      next: (jobopenings) => {
        this.jobopenings = jobopenings;
        if (jobopenings.length >= this.currentCount) {
          this.isEndedPage = false;
        } else {
          this.isEndedPage = true;
        }
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
