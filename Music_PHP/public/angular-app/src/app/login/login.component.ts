import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserDataService } from '../user-data.service';

class Credential {
  username!: string;
  password!: string;

  constructor(username:string, password:string) {
    this.username = username;
    this.password = password;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user!: Credential;

  @ViewChild("loginForm")
  loginForm!: NgForm;

  constructor(private _userService: UserDataService) {}

  ngOnInit() {
    this.user = new Credential("", "");
    // setTimeout(() => {
    //   this.loginForm.setValue(this.user);
    // }, 1);
  }

  public login() {
    this._userService.login(this.loginForm.value).subscribe({
      next: (data) => this.loginSuccess(data),
      error: (error) => this.handleError(error),
      complete: () => {}
    });
  }

  private loginSuccess(data: Object) {
    console.log(data);
    alert("Login successfully");
  }
  
  private handleError(error: Error) {
    console.log(error);
  }
  
}
