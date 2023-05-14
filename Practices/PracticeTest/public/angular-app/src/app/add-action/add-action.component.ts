import { Component } from '@angular/core';
import { Jobopening } from '../jobsearchings/jobsearchings.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsearchingDataServiceService } from '../jobsearching-data-service.service';

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.css']
})
export class AddActionComponent {

  existedJob!: Jobopening;
  actionForm!: FormGroup;

  constructor(private _jobService:JobsearchingDataServiceService, private _route:ActivatedRoute, private _router:Router) {}

  ngOnInit() {
    this.actionForm = new FormGroup({
      nextStep: new FormControl(),
      description: new FormControl(),
      date: new FormControl()
    });
  }

  onSubmit() {
    const jobopeningId = this._route.snapshot.params["jobopeningId"];
    if (!jobopeningId) {
      alert("Can not find the jobopeningId");
      return;
    }
    this._jobService.addActionOne(jobopeningId, this.actionForm.value).subscribe({
      next: (job) => {
        alert("Action has been added");
        this._router.navigate(["jobopenings/" + jobopeningId]);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }

}
