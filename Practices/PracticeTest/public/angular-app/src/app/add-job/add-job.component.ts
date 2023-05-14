import { Component } from '@angular/core';
import { Jobopening } from '../jobsearchings/jobsearchings.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsearchingDataServiceService } from '../jobsearching-data-service.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent {

  existedJob!: Jobopening;
  addForm!: FormGroup;
  titleForm: string = "Add Job";

  constructor(private _formBuilder: FormBuilder, private _route: ActivatedRoute, private _router: Router, private _jobsearchService: JobsearchingDataServiceService) {}

  ngOnInit() {
    this.addForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      salary: new FormControl(),
      experience: new FormControl()
    });
    this.loadJob();
  }

  loadJob() {
    const jobopeningId = this._route.snapshot.params["jobopeningId"];
    if (!jobopeningId) {
      return;
    }
    this._jobsearchService.getOne(jobopeningId).subscribe({
      next: (job) => {
        this.existedJob = job;
        this.titleForm = "Update Job";
        this.addForm = this._formBuilder.group({
          title: job.title,
          salary: job.salary,
          description: job.description,
          experience: job.experience
        });
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }

  onSave() {
    if (!this.existedJob) {
      this.onCreateOne();
      return;
    }
    this.onUpdateOne();
  }

  onCreateOne() {
    this._jobsearchService.addOne(this.addForm.value).subscribe({
      next: (job) => {
        alert("Add " + job.title + " job successfully");
        this._router.navigate(["jobopenings/" + job._id]);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }

  onUpdateOne() {
    this._jobsearchService.updateOne(this.existedJob._id, this.addForm.value).subscribe({
      next: (job) => {
        alert("Update " + this.existedJob.title + " job successfully");
        this._router.navigate(["jobopenings/" + this.existedJob._id]);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }

}
