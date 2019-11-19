import { TodoComponent } from "./components/todo/todo.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppBootstrapModule } from "./app-bootstrap/app-bootstrap-module";
import { MainComponent } from "./components/main/main.component";
import { FooterComponent } from "./components/main/footer/footer.component";
import { HeaderComponent } from "./components/main/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginService } from "./services/login.service";
import { MaterialModule } from "./material/material.module";
import { TodosListService } from "./services/todos-list.service";
import { HighlightPipe } from "./services/pipes/highlight.pipe";
import { ClockComponent } from "./components/clock/clock.component";
import { ProductComponent } from "./components/product/product.component";
import { ProductCardComponent } from "./components/product/product-card/product-card.component";
import { ManagementComponent } from "./components/management/management.component";
import { LoginComponent } from "./components/main/header/login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    TodoComponent,
    HighlightPipe,
    ClockComponent,
    ProductComponent,
    ProductCardComponent,
    ManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppBootstrapModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [LoginService, TodosListService],
  bootstrap: [AppComponent]
})
export class AppModule {}
