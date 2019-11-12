import { Component, OnInit } from "@angular/core";

import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  logged: boolean = false;
  errorMessage: string = "";

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.checkLogged();
    this.loginService.getUserList();
  }

  checkLogged() {
    this.logged = this.loginService.isLogged;
  }

  signIn(fields) {
    this.logged = this.loginService.singIn(fields.name, fields.password);
    if (!this.logged) {
      this.showErrorMessage("You have to enter valid information");
    }
  }

  signOut() {
    this.logged = this.loginService.signOut();
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => (this.errorMessage = ""), 2000);
  }
}
