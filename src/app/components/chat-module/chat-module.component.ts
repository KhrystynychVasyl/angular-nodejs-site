import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ChatSocketService } from 'src/app/services/chat-socket.service';

@Component({
  selector: 'app-chat-module',
  templateUrl: './chat-module.component.html',
  styleUrls: ['./chat-module.component.scss']
})
export class ChatModuleComponent implements OnInit {
  nickName: string = '';
  constructor(
    private chatSocketService: ChatSocketService,
    private loginService: LoginService
  ) {}

  ngOnInit() {}

  get nickNameStatus() {
    return this.chatSocketService.getCurrNickNameStatus();
  }

  get logged() {
    return this.loginService.isLogged;
  }

  setNickName() {
    this.chatSocketService.setCurrNickName(this.nickName);
  }
}
