import { Todo } from "./classes/todo";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TodosListService {
  @Output() todosListUpdate = new EventEmitter<boolean>();
  readonly API_todosList_URL = "/api/todos";
  private todosLocalList: Todo[] = [];

  private urlTemp: string = "";

  constructor(private http: HttpClient) {
    if (this.todosLocalList.length === 0) {
      this.getHttpTodosList();
    }
  }

  getHttpTodosList() {
    let check: boolean;
    this.http.get<Todo[]>(this.API_todosList_URL).subscribe(
      list => {
        check = true;
      },
      error => {
        check = false;

        this.urlTemp = check
          ? this.API_todosList_URL
          : "http://localhost:5678" + this.API_todosList_URL;

        this.http.get<Todo[]>(this.urlTemp).subscribe(list => {
          this.todosLocalList = list;
          this.todosListUpdate.emit(true);
        }).closed;
      }
    ).closed;
  }

  putHttpTodosById(id: number, data) {
    this.http.put<Object>(this.urlTemp + "/" + id, data).subscribe().closed;
  }

  postHttpTodos(todo: Todo) {
    this.http.post<Todo>(this.urlTemp, todo).subscribe().closed;
  }

  deleteHttpTodos(id: number) {
    this.http.delete(this.urlTemp + "/" + id).subscribe().closed;
  }

  getTodosList(): Todo[] {
    return this.todosLocalList;
  }

  getCountCompleteTodo(): number {
    return this.todosLocalList.filter(el => el.complete).length;
  }

  addTodo(todo: Todo) {
    todo.id = this.todosLocalList[this.todosLocalList.length - 1].id + 1;
    this.todosLocalList.push(todo);
    this.postHttpTodos(todo);
  }

  deleteTodoById(id: number) {
    this.todosLocalList = this.todosLocalList.filter(el => el.id !== id);
    this.deleteHttpTodos(id);
  }

  toggleCompleteTodoById(todo: Todo) {
    this.updateTodoById(todo.id, { complete: !todo.complete });
  }

  updateTodoById(id: number, data: Object) {
    Object.assign(this.getTodoById(id), data);
    this.putHttpTodosById(id, data);
  }

  getTodoById(id: number) {
    return this.todosLocalList.find(el => el.id === id);
  }
}