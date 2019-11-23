import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  modalRef: BsModalRef;
  logged: boolean = false;
  errorMessage: string = "";
  signErrorMessage: string = "";
  password: string;
  password_confirm: string;

  constructor(
    private loginService: LoginService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.checkLogged()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  checkLogged() {
    this.logged = this.loginService.isLogged;
  }

  logIn(fields) {
    let _this = this;
    this.loginService.logInUser(fields.name, fields.password, function(result) {
      if (!result) {
        _this.showErrorMessage("You have to enter valid information");
      } else {
        _this.logged = result;
      }
    });
  }

  logOut() {
    this.logged = this.loginService.logOut();
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => (this.errorMessage = ""), 2000);
  }

  signIn(fields) {
    let _this = this;
    this.loginService.signIn(fields.name, fields.password, fields.key, function(
      result
    ) {
      _this.checkLogged();
      _this.modalRef.hide();
    });
  }

  signOut() {
    this.logged = this.loginService.logOut();
  }

  showSignErrorMessage(message: string) {
    this.signErrorMessage = message;
    setTimeout(() => (this.signErrorMessage = ""), 2000);
  }
}
