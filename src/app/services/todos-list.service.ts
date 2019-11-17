import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as moment from "moment";

import { Todo } from "./classes/todo";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: "root"
})
export class TodosListService {
  @Output() todosListUpdate = new EventEmitter<boolean>();

  private isLogged: boolean = false;

  readonly API_todosList_URL = "/api/todos";

  private todosLocalList: Todo[] = [];

  private urlTempT: string = "";

  pageLoaded: moment.Moment;

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.todosLink;
    this.isLogged = loginService.isLogged;
    setTimeout(() => {
      if (this.todosLocalList.length === 0) {
        this.getHttpTodosList();
      }
    }, 1000);
    loginService.loggedStatus.subscribe(check => {
      this.isLogged = check;
      this.getHttpTodosList();
    });
  }

  get todosLink() {
    if (!this.urlTempT) {
      let check: boolean;
      this.http
        .put(this.API_todosList_URL, { test: true })
        .subscribe(
          list => {
            check = true;
          },
          error => {
            check = false;
          }
        )
        .add(() => {
          this.urlTempT = check
            ? this.API_todosList_URL
            : "http://localhost:5678" + this.API_todosList_URL;
        });
      return this.urlTempT;
    } else {
      return this.urlTempT;
    }
  }

  getHttpTodosList() {
    let url;
    if (this.isLogged) {
      url =
        this.todosLink +
        "/?user=" +
        encodeURIComponent(this.loginService.currUserData);
    } else {
      url = this.todosLink;
    }
    this.http.get<Todo[]>(url).subscribe(list => {
      this.todosLocalList = list;
      this.todosListUpdate.emit(true);
    }).closed;
  }

  putHttpTodosById(_idTodos: string, data: Object) {
    this.http.put<Object>(this.urlTempT + "/" + _idTodos, data).subscribe()
      .closed;
  }

  postHttpTodos(todo: Object) {
    this.http.post<Todo>(this.urlTempT, todo).subscribe(todo => {
      this.todosLocalList.push(todo);
    }).closed;
  }

  deleteHttpTodos(_id: string) {
    let url = this.urlTempT + "/" + _id;
    if (this.loginService.currUserData) {
      url = url + "-" + this.loginService.currUserData;
    } else {
      url = url + "-" + "JohnDoe";
    }
    this.http.delete(url).subscribe().closed;
  }

  getTodosList(): Todo[] {
    return this.todosLocalList;
  }

  getCountCompleteTodo(): number {
    return this.todosLocalList.filter(el => el.complete).length;
  }

  addTodo(todo: Todo) {
    if (this.todosLocalList.length > 0) {
      todo.id = this.todosLocalList[this.todosLocalList.length - 1].id + 1;
    } else {
      todo.id = 1;
    }
    let time = moment(new Date()).format("HH:mm:ss A");
    todo.time = moment(new Date());
    todo.title = todo.title + "\n" + time;
    let body = { data: todo, _idUser: this.loginService.currUserData };
    this.postHttpTodos(body);
  }

  deleteTodoById(_id: string) {
    this.todosLocalList = this.todosLocalList.filter(el => el._id !== _id);
    this.deleteHttpTodos(_id);
  }

  toggleCompleteTodoById(todo: Todo) {
    this.updateTodoById(todo._id, todo);
  }

  updateTodoById(_id: string, todo: Todo) {
    let body = {
      _idUser: this.loginService.currUserData,
      data: { complete: !todo.complete }
    };
    Object.assign(this.getTodoById(_id), body.data);
    this.putHttpTodosById(todo._id, body);
  }

  getTodoById(_id: string) {
    return this.todosLocalList.find(el => el._id === _id);
  }
}
