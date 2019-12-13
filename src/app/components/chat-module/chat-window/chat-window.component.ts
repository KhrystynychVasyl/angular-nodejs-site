import { ChatSocketService } from '../../../services/chat-socket.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { merge } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  message: string;
  messages: any[] = [];
  constructor(
    private chatSocketService: ChatSocketService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.chatSocketService.userConnected(this.loginService.currUserInfo);
    this.messages.push('You joined');
    this.chatSocketService.getMessage().subscribe(msg => {
      this.messages.push(`${msg['name']}: ${msg['message']}`);
    });
    this.chatSocketService.getMessage2().subscribe(msg => {
      this.messages.push(`${msg} connected`);
    });
    this.chatSocketService.getMessage3().subscribe(msg => {
      this.messages.push(`${msg} disconnected`);
    });
    this.chatSocketService.allMessage().subscribe(mes => console.log(mes));
  }

  get logged() {
    return this.loginService.isLogged;
  }

  chatMessage() {
    this.sendMessage(this.message);
    this.messages.push(`You: ${this.message}`);
    this.message = '';
  }

  sendMessage(msg) {
    this.chatSocketService.sendMessage(msg);
  }

  disconnect() {
    this.loginService.loggedStatus.subscribe(status => {
      if (!status) {
        this.chatSocketService.close();
      }
    });
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    this.chatSocketService.close();
  }
}
