import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';
import { environment } from 'src/environments/environment';


export class Credential {
  username!: string;
  password!: string;

  constructor(username: string= environment.EMPTY_STRING, password: string= environment.EMPTY_STRING) {
    this.username= username;
    this.password= password;
  }

  toJSON() {
    return {[environment.PASSWORD]: this.password, [environment.USER_NAME]: this.username};
  }

  fillUserFromTempleteForm(loginForm: NgForm) {
    this.password= loginForm.value.password;
    this.username= loginForm.value.username;
  }

}

export class Token {
  #token!: string;

  get token() {return this.#token;}
  set token(token: string) {this.#token=token;}

  constructor(token: string) {
    this.#token= token;
  }

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user!: Credential;
  errorMessage: string= environment.EMPTY_STRING;
  isError: boolean= environment.DEFAULT_FALSE;

  @ViewChild("loginForm")
  loginForm!: NgForm;

  constructor(private _userService: UserDataService, private _authenticationService: AuthenticationService, private _router: Router) {}

  ngOnInit() {
    this.user= new Credential();
  }

  public login() {
    if (!this.validate()) {
      return;
    }

    this._userService.login(this.user).subscribe({
      next: (token) => this.onLoginSuccess(token),
      error: (error) => this.onLoginError(error),
      complete: () => {}
    });
  }

  private onLoginSuccess(token: Token) {
    this._authenticationService.token= token.token;
    this.resetMessage();
    console.log(token.token);

    this._router.navigate([environment.SONGS]);
  }
  
  private onLoginError(error: HttpErrorResponse) {
    console.log(error);
    let message = environment.MSG_FAILED_TO_LOGIN;
    if (error && error.error && error.error.message) {
      message = error.error.message;
    }
    this.updateErrorMessage(message);
  }

  private resetMessage() {
    this.errorMessage= environment.EMPTY_STRING
    this.isError= environment.DEFAULT_FALSE;
  }

  onInputChange() {
    // this.resetMessage();
  }

  private updateErrorMessage(message: string) {
    this.errorMessage= message;
    this.isError= environment.DEFAULT_TRUE;
  }

  private validate(): boolean {
    const username = this.user.username;
    const name = this.user.password;
  
    if (!this.user.username || !this.user.password) {
      this.updateErrorMessage(environment.MSG_FAILED_TO_LOGIN);
      return environment.DEFAULT_FALSE;
    }
  
    return environment.DEFAULT_TRUE;
  }
  
  
}
