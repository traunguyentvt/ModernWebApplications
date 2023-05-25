import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { UserDataService } from '../user-data.service';
import { environment } from 'src/environments/environment';


export class User {

  #_id!: string;
  #name!: string;
  #username!: string;
  #password!: string;

  get _id() {return this.#_id;}
  get name() {return this.#name;}
  get username() {return this.#username;}
  get password() {return this.#password;}

  set name(name: string) {this.#name=name;}
  set username(username: string) {this.#username=username;}
  set password(password: string) {this.#password=password;}

  constructor(id:string= environment.EMPTY_STRING, name: string= environment.EMPTY_STRING, username: string= environment.EMPTY_STRING, password: string= environment.EMPTY_STRING) {
    this.#_id= id;
    this.#name= name;
    this.#username= username;
    this.#password= password;
  }

  toJSON(): Object {
    return {[environment.NAME]: this.name, [environment.PASSWORD]: this.password, [environment.USER_NAME]: this.username};
  }

  fillUserFromRelativeForm(registrationForm: FormGroup) {
    this.name= registrationForm.value.name;
    this.password= registrationForm.value.password;
    this.username= registrationForm.value.username;
  }

}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

registrationForm!: FormGroup;
private _user: User= new User();
successMessage: string= environment.EMPTY_STRING;
errorMessage: string= environment.EMPTY_STRING;
isSuccess: boolean= environment.DEFAULT_FALSE;
isError: boolean= environment.DEFAULT_FALSE;

constructor(private _userService: UserDataService, private _router: Router) {}

ngOnInit() {
  this.registrationForm= new FormGroup({
    name: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    repeatPassword: new FormControl()
  });
}

register() {
  if (!this.validateForm()) {
    return;
  }

  this._user.fillUserFromRelativeForm(this.registrationForm);
  this._userService.register(this._user).subscribe({
    next: (user) => this.onRegistrationSuccess(user),
    error: (error) => this.onRegistrationError(error),
    complete: () => {}
  });
}

private onRegistrationSuccess(user: User) {
  this.successMessage= environment.MSG_USER_REGISTRATION_SUCCESSFULLY;
  this.isSuccess= environment.DEFAULT_TRUE;
  this.errorMessage= environment.EMPTY_STRING;
  this.isError= environment.DEFAULT_FALSE;
  setTimeout(() => {
      this._router.navigate([environment.LOGIN]);
  }, environment.DEFAULT_TIME_OUT);
}

private onRegistrationError(error: HttpErrorResponse) {
  console.log(error);
  let message = environment.MSG_FAILED_TO_REGISTER_USER;
  if (error && error.error && error.error.message) {
    message = error.error.message;
  }
  this.updateErrorMessage(message);
}

onInputChange() {
  // this.resetMessage();
}

// private resetMessage() {
//   this.successMessage= environment.EMPTY_STRING;
//   this.isSuccess= environment.DEFAULT_FALSE;
//   this.errorMessage= environment.EMPTY_STRING;
//   this.isError= environment.DEFAULT_FALSE;
// }

private updateErrorMessage(message: string) {
  this.successMessage= environment.EMPTY_STRING;
  this.isSuccess= environment.DEFAULT_FALSE;
  this.errorMessage= message;
  this.isError= environment.DEFAULT_TRUE;
}

private validateForm(): boolean {
  const username = this.registrationForm.value.username;
  const name = this.registrationForm.value.name;
  const password = this.registrationForm.value.password;
  const repeatPassword = this.registrationForm.value.repeatPassword;

  if (!username || !name || !password || !repeatPassword || password != repeatPassword) {
    this.updateErrorMessage(environment.MSG_FAILED_TO_REGISTER_USER);
    return environment.DEFAULT_FALSE;
  }

  return environment.DEFAULT_TRUE;
}

}
