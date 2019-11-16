import { Todo } from "./classes/todo";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class TodosListService {
  @Output() todosListUpdate = new EventEmitter<boolean>();
  readonly API_todosList_URL = "/api/todos";
  private todosLocalList: Todo[] = [];
  pageLoaded: moment.Moment;

  private urlTemp: string = "";

  constructor(private http: HttpClient) {
    if (this.todosLocalList.length === 0) {
      this.getHttpTodosList();
    }
  }

  getHttpTodosList() {
    let check: boolean;
    this.http
      .get<Todo[]>(this.API_todosList_URL)
      .subscribe(
        list => {
          check = true;
        },
        error => {
          check = false;
        }
      )
      .add(() => {
        this.urlTemp = check
          ? this.API_todosList_URL
          : "http://localhost:5678" + this.API_todosList_URL;

        this.http.get<Todo[]>(this.urlTemp).subscribe(list => {
          console.log(1);
          this.todosLocalList = list;
          this.todosListUpdate.emit(true);
        }).closed;
      });
  }
  putHttpTodosById(id: string, data: Object) {
    this.http.put<Object>(this.urlTemp + "/" + id, data).subscribe().closed;
  }

  postHttpTodos(todo: Todo) {
    this.http.post<Todo>(this.urlTemp, todo).subscribe(inf => inf).closed;
  }

  deleteHttpTodos(_id: string) {
    this.http.delete(this.urlTemp + "/" + _id).subscribe().closed;
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
    this.todosLocalList.push(todo);
    this.postHttpTodos(todo);
  }

  deleteTodoById(_id: string) {
    this.todosLocalList = this.todosLocalList.filter(el => el._id !== _id);
    this.deleteHttpTodos(_id);
  }

  toggleCompleteTodoById(todo: Todo) {
    this.updateTodoById(todo.id, todo);
  }

  updateTodoById(id: number, todo: Todo) {
    let update = { complete: !todo.complete };
    Object.assign(this.getTodoById(id), update);
    this.putHttpTodosById(todo._id, update);
  }

  getTodoById(id: number) {
    return this.todosLocalList.find(el => el.id === id);
  }
}
