import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserDataService } from '../user-data.service';

export class User {

  #_id!: string;
  #name!: string;
  #username!: string;
  #password!: string;

  get _id() {return this.#_id;}
  get name() {return this.#name;}
  get username() {return this.#username;}
  get password() {return this.#password;}

  constructor(id:string, name:string, username:string, password:string) {
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

constructor(private _userService: UserDataService) {}

ngOnInit() {
  this.registrationForm = new FormGroup({
    name: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    repeatPassword: new FormControl()
  });
}

register() {
  this._userService.register(this.registrationForm.value).subscribe({
    next: (user) => {
      alert("Your account has been created");
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {

    }
  });
}

}
