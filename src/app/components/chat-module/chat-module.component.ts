import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-chat-module',
  templateUrl: './chat-module.component.html',
  styleUrls: ['./chat-module.component.scss']
})
export class ChatModuleComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  get logged() {
    return this.loginService.isLogged;
  }
}
