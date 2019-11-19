import { Injectable, EventEmitter, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  @Output() loggedStatus = new EventEmitter<boolean>();
  readonly API_usersList_URL = "/api/users";
  readonly API_keysList_URL = "/api/keys";
  private logged: boolean = false;
  private currUser: string = "";

  private currUserAdminStatus: boolean = false;

  private urlTempU: string;
  private urlTempK: string;

  constructor(private http: HttpClient) {}

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
    let check: boolean;
    this.http
      .get(this.API_usersList_URL)
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
        let body = { login: name, password: pass };
        this.http.put(this.urlTempU + "/check", body).subscribe(answer => {
          if (answer["check"]) {
            this.logged = true;
            this.currUser = answer["_id"];
            this.currUserAdminStatus = answer["check"];
            this.loggedStatus.emit(this.logged);
            callback(true);
          } else {
            callback(false);
          }
        }).closed;
      });
  }

  logOut(): boolean {
    this.currUser = "";
    this.loggedStatus.emit(false);
    return (this.logged = false);
  }

  signIn(name, pass, key, callback) {
    let check: boolean;
    this.http
      .get(this.API_keysList_URL)
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
        this.urlTempU = check
          ? this.API_usersList_URL
          : "http://localhost:5678" + this.API_usersList_URL;

        let body = { key: key };
        this.http.put(this.urlTempK + "/check", body).subscribe(answer => {
          if (answer) {
            let data = { login: name, password: pass, access: false };
            this.http.post(this.urlTempU, data).subscribe(answer => {
              this.currUser = answer["_id"];
              this.logged = true;
              this.loggedStatus.emit(this.logged);
              callback(true);
            });
          } else {
            callback(false);
          }
        }).closed;
      });
  }
}
