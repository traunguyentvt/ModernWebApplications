import { Component } from '@angular/core';
import { Jobopening } from '../jobsearchings/jobsearchings.component';
import { JobsearchingDataServiceService } from '../jobsearching-data-service.service';


@Component({
  selector: 'app-searchskills',
  templateUrl: './searchskills.component.html',
  styleUrls: ['./searchskills.component.css']
})
export class SearchskillsComponent {

  limitArray: number[] = [5, 10, 15, 20, 25, 50, 100];
  currentCount: number = this.limitArray[0];
  offset: number = 0;
  jobopenings: Jobopening[] = [];
  keySearch!: string;
  isEndedPage: boolean = false;

  constructor(private _jobService:JobsearchingDataServiceService) {}

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this._jobService.getAll(this.offset, this.currentCount, this.keySearch, null).subscribe({
      next: (jobs) => {
        this.jobopenings = jobs;
        if (jobs.length >= this.currentCount) {
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

  onSearchBoxChange() {
    this.offset = 0;
    this.loadJobs();
  }

  onSearch() {
    this.offset = 0;
    this.loadJobs();
  }

  onLimitChange() {
    this.offset = 0;
    this.loadJobs();
  }

  onOffsetChange(offset:number) {
    this.offset = offset;
    this.loadJobs();
  }

}
