import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
  private protectStatus = false;
  constructor(private loginService: LoginService) {
    loginService.loggedStatus.subscribe(status => {
      this.protectStatus = status;
    });
  }

  canActivate(): boolean {
    this.loginService.userAdminStatus;

    return this.loginService.userAdminStatus;
  }
}
