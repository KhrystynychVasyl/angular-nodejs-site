import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { TodoComponent } from './components/todo/todo.component';
import { ProductComponent } from './components/product/product.component';
import { ChatModuleComponent } from './components/chat-module/chat-module.component';
import { ManagementComponent } from './components/management/management.component';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'products', component: ProductComponent },
  { path: 'chat-module', component: ChatModuleComponent },
  {
    path: 'management',
    component: ManagementComponent,
    canActivate: [LoginGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
