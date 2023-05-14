import { Component } from '@angular/core';
import { Jobopening, Location } from '../jobsearchings/jobsearchings.component';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsearchingDataServiceService } from '../jobsearching-data-service.service';

@Component({
  selector: 'app-jobsearching',
  templateUrl: './jobsearching.component.html',
  styleUrls: ['./jobsearching.component.css']
})
export class JobsearchingComponent {

  jobopening: Jobopening = new Jobopening("", "", "", "", new Location("", "", [0]), "");

  constructor(private _route:ActivatedRoute, private _router:Router, private _jobsearchingService:JobsearchingDataServiceService) {}

  ngOnInit() {
    this.loadJob();
  }

  loadJob() {
    const jobopeningId = this._route.snapshot.params["jobopeningId"];
    this._jobsearchingService.getOne(jobopeningId).subscribe({
      next: (job) => {
        this.jobopening = job;
        if (isNaN(parseFloat(job.salary))) {
          this.jobopening.salary = atob(job.salary);
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }

  onDelete() {
    if (confirm("Do you want to delete " + this.jobopening.title + "?")) {
      this._jobsearchingService.deleteOne(this.jobopening._id).subscribe({
        next: (job) => {
          alert("Delete " + this.jobopening.title + " successfully");
          this._router.navigate(["jobopenings"]);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {

        }
      });
    }
  }

  onUpdate() {
    const jobopeningId = this.jobopening._id;
    this._router.navigate(["jobopenings/" + jobopeningId + "/updatejob"]);
  }

  onAddAction() {
    this._router.navigate(["jobopenings/" + this.jobopening._id + "/addAction"]);
  }

}
