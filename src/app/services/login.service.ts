import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  @Output() loggedStatus = new EventEmitter<boolean>();
  baseUrl = environment.baseUrl;
  readonly API_usersList_URL = this.baseUrl + '/api/users';
  readonly API_keysList_URL = this.baseUrl + '/api/keys';
  private logged = false;
  private currUser = '';

  some: string = '';

  private currUserAdminStatus = false;

  constructor(private http: HttpClient) {
    if (!this.logged) {
      this.currUserAdminStatus = false;
    }
  }

  get isLogged(): boolean {
    return this.logged;
  }

  get currUserInfo() {
    return this.currUser;
  }

  get userAdminStatus() {
    return this.currUserAdminStatus;
  }

  logInUser(name, pass, callback) {
    const body = { login: name, password: pass };
    this.http.put(this.API_usersList_URL + '/check', body).subscribe(answer => {
      if (answer['check']) {
        this.logged = true;
        this.currUser = answer['_id'];
        this.currUserAdminStatus = answer['check'];
        this.loggedStatus.emit(this.logged);
        callback(true);
      } else {
        callback(false);
      }
    }).closed;
  }

  logOut(): boolean {
    this.currUser = '';
    this.loggedStatus.emit(false);
    return (this.logged = false);
  }

  signIn(name, pass, key, callback) {
    const body = { key };
    this.http.put(this.API_keysList_URL + '/check', body).subscribe(answer => {
      if (answer) {
        const data = { login: name, password: pass, access: false };
        this.http.post(this.API_usersList_URL, data).subscribe(answer => {
          this.currUser = answer['_id'];
          this.logged = true;
          this.loggedStatus.emit(this.logged);
          callback(true);
        });
      } else {
        callback(false);
      }
    }).closed;
  }
}
