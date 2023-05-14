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
  // location!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _route: ActivatedRoute, private _router: Router, private _jobsearchService: JobsearchingDataServiceService) {}

  ngOnInit() {
    this.addForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      salary: new FormControl(),
      experience: new FormControl(),
      skills: new FormControl(),
      postDate: new FormControl(),
      name: new FormControl(),
      latitude: new FormControl(),
      longitude: new FormControl()
    });
    // this.location = new FormGroup({
    //   name: new FormControl(),
    //   latitude: new FormControl(),
    //   longitude: new FormControl()
    // });
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
        if (isNaN(parseFloat(job.salary))) {
          this.existedJob.salary = atob(job.salary);
        }

        const coordinates: number[] = job.location?.coordinates;
        let longitude;
        let latitude;
        if (coordinates && coordinates.length == 2) {
          longitude = coordinates[0];
          latitude = coordinates[1];
        }
        const name = job.location?.name;

        // const datePine: DatePipe = new DatePipe("");
        // const formattedDate = datePine.transform(job.postDate, "yyyy-MM-dd");
        let salary = job.salary;
        if (isNaN(parseFloat(salary))) {
          salary = atob(job.salary);
        }
        const fmDate = new Date(job.postDate).toISOString().split('T')[0];
        this.addForm = this._formBuilder.group({
          title: job.title,
          salary: salary,
          description: job.description,
          experience: job.experience,
          skills: job.skills.toString(),
          postDate: fmDate,
          name: name,
          longitude: longitude,
          latitude: latitude
        });
        console.log(this.addForm.value);
        
        // this.location = this._formBuilder.group({
        //   name: job.location?.name,
        //   latitude: latitude,
        //   longitude: longitude
        // });
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }

  onSave() {
    console.log(this.addForm.value);
    const skills:string = this.addForm.controls["skills"].value;
    const skill_array = skills.split(",");
    let skill_results:string[] = [];
    for (let s of skill_array) {
      if (s.trim()) {
        skill_results.push(s.trim());
      }
    }

    let location = {
      name: this.addForm.controls["name"].value,
      coordinates: [parseFloat(this.addForm.controls["longitude"].value), parseFloat(this.addForm.controls["latitude"].value)]
    }

    const job = {
      title: this.addForm.controls["title"].value,
      description: this.addForm.controls["description"].value,
      salary: this.addForm.controls["salary"].value,
      experience: this.addForm.controls["experience"].value,
      postDate: this.addForm.controls["postDate"].value,
      skills: skill_results,
      location: location
    };

    console.log(job);
    // return;
    if (!this.existedJob) {
      this.onCreateOne(job);
      return;
    }
    this.onUpdateOne(job);
  }

  onCreateOne(job:Object) {
    this._jobsearchService.addOne(job).subscribe({
      next: (savedjob) => {
        alert("Add " + savedjob.title + " job successfully");
        this._router.navigate(["jobopenings/" + savedjob._id]);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }

  onUpdateOne(job:Object) {
    this._jobsearchService.updateOne(this.existedJob._id, job).subscribe({
      next: (updatedjob) => {
        alert("Update " + updatedjob.title + " job successfully");
        console.log(updatedjob);
        this._router.navigate(["jobopenings/" + updatedjob._id]);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    });
  }

}
