import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserDataService } from '../user-data.service';

export class User {
  
  #_id!: string;
  #name!: string;
  #username!: string;
  #password!: string;

  get _id() { return this.#_id; }
  get name() { return this.#name; }
  set name(name: string) {this.#name= name;}
  get username() {return this.#username;}
  get password() {return this.#password;}

  constructor(id: string, name: string, username: string, password:string) {
    this.#_id= id;
    this.#name= name;
    this.#username= username;
    this.#password= password;
  }

}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrationForm!: FormGroup;

  constructor(private _formBulder: FormBuilder, private _userService: UserDataService) {

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
      password: new FormControl()
    });
  }

  register(form: FormGroup) {
    // console.log(this.registrationForm.value);
    console.log(form.value);
    this._userService.register(form.value).subscribe({
      next: (user) => {
        console.log(user);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("Completed!");
      }
    });
  }

}
