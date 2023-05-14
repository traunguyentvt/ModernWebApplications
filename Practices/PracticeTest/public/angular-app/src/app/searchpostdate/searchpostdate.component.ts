import { Component } from '@angular/core';
import { Jobopening } from '../jobsearchings/jobsearchings.component';
import { JobsearchingDataServiceService } from '../jobsearching-data-service.service';

@Component({
  selector: 'app-searchpostdate',
  templateUrl: './searchpostdate.component.html',
  styleUrls: ['./searchpostdate.component.css']
})
export class SearchpostdateComponent {

  limitArray: number[] = [5, 10, 15, 20, 25, 50, 100];
  currentCount: number = this.limitArray[0];
  offset:number = 0;
  jobopenings: Jobopening[] = [];
  isEndedPage: boolean = false;

  constructor(private _jobService: JobsearchingDataServiceService) {}

  ngOnInit() {
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

  loadJobs() {
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth()-6);
    console.log(currentDate);
    this._jobService.getAll(this.offset, this.currentCount, "", currentDate).subscribe({
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

}
