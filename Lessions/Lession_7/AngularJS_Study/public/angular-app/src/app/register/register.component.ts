import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrationForm!: FormGroup;

  constructor(private _formBulder: FormBuilder) {

  }
  ngOnInit(): void {
    // this.registrationForm = this._formBulder.group({
    //   name: "123",
    //   username: "123",
    //   password: "0101",
    //   repeatPassword: "0101",
    // });

    this.registrationForm = new FormGroup({
      name: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      repeatPassword: new FormControl(),
    });
  }

  register(form: FormGroup) {
    // console.log(this.registrationForm.value);
    console.log(form.value);
  }

}
