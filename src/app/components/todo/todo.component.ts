import { TodosListService } from "src/app/services/todos-list.service";
import { Component, OnInit } from "@angular/core";
import { Todo } from "src/app/services/classes/todo";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit {
  newTodo = new Todo();
  searchText: string = "";

  constructor(private todosListService: TodosListService) {}

  ngOnInit() {
    this.todosListService.todosListUpdate.subscribe(status => {});
  }

  get todosList(): Todo[] {
    return this.todosListService.getTodosList();
  }

  get countCompleteTodo(): number {
    return this.todosListService.getCountCompleteTodo();
  }

  addTodo() {
    if (this.newTodo.title !== "") {
      this.todosListService.addTodo(this.newTodo);
      this.newTodo = new Todo();
    }
  }

  deleteTodo(todo: Todo) {
    this.todosListService.deleteTodoById(todo._id);
  }

  toggleComplete(todo: Todo) {
    this.todosListService.toggleCompleteTodoById(todo);
  }
}
