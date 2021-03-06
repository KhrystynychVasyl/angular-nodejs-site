import { environment } from 'src/environments/environment';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

import { Todo } from './classes/todo';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TodosListService {
  @Output() todosListUpdate = new EventEmitter<boolean>();

  private isLogged = false;

  baseUrl = environment.baseUrl;

  readonly API_todosList_URL = this.baseUrl +  '/api/todos';

  private todosLocalList: Todo[] = [];


  pageLoaded: moment.Moment;

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.isLogged = loginService.isLogged;

    if (this.todosLocalList.length === 0) {
      this.getHttpTodosList();
    }

    loginService.loggedStatus.subscribe(check => {
      this.isLogged = check;
      this.getHttpTodosList();
    });
  }

  getHttpTodosList() {

        let url;
        if (this.isLogged) {
          url =
            this.API_todosList_URL +
            '/?user=' +
            encodeURIComponent(this.loginService.currUserInfo);
        } else {
          url = this.API_todosList_URL;
        }
        this.http.get<Todo[]>(url).subscribe(list => {
          this.todosLocalList = list;
          this.todosListUpdate.emit(true);
        }).closed;

  }

  putHttpTodosById(_idTodos: string, data: Object) {
    this.http.put<Object>(this.API_todosList_URL + '/' + _idTodos, data).subscribe()
      .closed;
  }

  postHttpTodos(todo: Object) {
    this.http.post<Todo>(this.API_todosList_URL, todo).subscribe(todo => {
      this.todosLocalList.push(todo);
    }).closed;
  }

  deleteHttpTodos(_id: string) {
    let url = this.API_todosList_URL + '/' + _id;
    if (this.loginService.currUserInfo) {
      url = url + '-' + this.loginService.currUserInfo;
    } else {
      url = url + '-' + 'JohnDoe';
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
    const time = moment(new Date()).format('HH:mm:ss A');
    todo.time = moment(new Date());
    todo.title = todo.title + '\n' + time;
    const body = { data: todo, _idUser: this.loginService.currUserInfo };
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
    const body = {
      _idUser: this.loginService.currUserInfo,
      data: { complete: !todo.complete }
    };
    Object.assign(this.getTodoById(_id), body.data);
    this.putHttpTodosById(todo._id, body);
  }

  getTodoById(_id: string) {
    return this.todosLocalList.find(el => el._id === _id);
  }
}
