import { Injectable, EventEmitter, Output } from "@angular/core";
import { User } from "./classes/user";
import { HttpClient } from "@angular/common/http";
import { Key } from "./classes/key";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  @Output() loggedStatus = new EventEmitter<boolean>();
  readonly API_usersList_URL = "/api/users";
  readonly API_keysList_URL = "/api/keys";
  private logged: boolean = false;
  currUser: Object = {};
  private urlTempU: string;
  private urlTempK: string;

  constructor(private http: HttpClient) {
    this.usersLink, this.keysLink;
  }

  get isLogged(): boolean {
    return this.logged;
  }

  get currUserData() {
    return this.currUser;
  }

  get usersLink() {
    if (!this.urlTempU) {
      let check: boolean;
      this.http
        .put(this.API_usersList_URL, { test: true })
        .subscribe(
          list => {
            check = true;
          },
          error => {
            check = false;
          }
        )
        .add(() => {
          this.urlTempU = check
            ? this.API_usersList_URL
            : "http://localhost:5678" + this.API_usersList_URL;
        });
      return this.urlTempU;
    } else {
      return this.urlTempU;
    }
  }

  get keysLink() {
    if (!this.urlTempK) {
      let check: boolean;
      this.http
        .put(this.API_keysList_URL, { test: true })
        .subscribe(
          list => {
            check = true;
          },
          error => {
            check = false;
          }
        )
        .add(() => {
          this.urlTempK = check
            ? this.API_keysList_URL
            : "http://localhost:5678" + this.API_keysList_URL;
        });
      return this.urlTempK;
    } else {
      return this.urlTempK;
    }
  }

  logInUser(name, pass, callback) {
    let body = { login: name, password: pass };
    this.http.put(this.usersLink + "/check", body).subscribe(answer => {
      if (answer) {
        this.logged = true;
        this.loggedStatus.emit(this.logged);
        this.currUser = body;
        callback(true);
      } else {
        callback(false);
      }
    }).closed;
  }

  logOut(): boolean {
    this.currUser = {};
    this.loggedStatus.emit(false);
    return (this.logged = false);
  }

  signIn(name, pass, key, callback) {
    let body = { key: key };
    this.http.put(this.keysLink + "/1", body).subscribe(answer => {
      if (answer) {
        let data = { login: name, password: pass };
        this.http.post(this.usersLink, data).subscribe(answer => {
          this.currUser = data;
          this.logged = true
          callback(true);
        });
      } else {
        callback(false);
      }
    }).closed;
  }
}
