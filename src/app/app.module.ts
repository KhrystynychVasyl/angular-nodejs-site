import { ChatSocketService } from './services/chat-socket.service';
import { BuyCartListService } from 'src/app/services/buy-cart-list.service';
import { ProductsListService } from './services/products-list.service';
import { TodoComponent } from './components/todo/todo.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap-module';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { HeaderComponent } from './components/main/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginService } from './services/login.service';
import { MaterialModule } from './material/material.module';
import { TodosListService } from './services/todos-list.service';
import { HighlightPipe } from './services/pipes/highlight.pipe';
import { ClockComponent } from './components/clock/clock.component';
import { ProductComponent } from './components/product/product.component';
import { ProductCardComponent } from './components/product/product-card/product-card.component';
import { ManagementComponent } from './components/management/management.component';
import { LoginComponent } from './components/main/header/login/login.component';
import { LoginGuardService } from './services/login-guard.service';
import { BuyCartComponent } from './components/main/buyCart/buyCart.component';
import { ChatModuleComponent } from './components/chat-module/chat-module.component';
import { ChatWindowComponent } from './components/chat-module/chat-window/chat-window.component';

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
    ManagementComponent,
    BuyCartComponent,
    ChatModuleComponent,
    ChatWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [
    LoginService,
    LoginGuardService,
    TodosListService,
    ProductsListService,
    BuyCartListService,
    ChatSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
