import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { TodoComponent } from "./components/todo/todo.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "todo", component: TodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
