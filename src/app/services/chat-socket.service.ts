import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable, EventEmitter } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {
  messageData = {};
  currNickName: string = '';
  constructor(private socket: Socket, private loginService: LoginService) {}

  setCurrNickName(name) {
    this.currNickName = name;
  }

  close() {
    this.socket.disconnect();
  }

  getCurrNickNameStatus() {
    return Boolean(this.currNickName);
  }

  userConnected() {
    this.messageData['userId'] = this.loginService.currUserInfo;
    this.messageData['nickName'] = this.currNickName;
    this.socket.connect();
    this.socket.emit('new-user', this.messageData);
  }

  allChatMessage() {
    return this.socket.fromEvent('chatMessage').pipe(
      map(data => {
        let localeData = {
          yourMessage: false,
          servicesMessage: false,
          message: ''
        };
        switch (data['messageType']) {
          case 'user-connected':
            localeData.servicesMessage = true;
            if (data['userId'] === this.loginService.currUserInfo) {
              localeData.yourMessage = true;
              localeData.message = `You have joined`;
            } else {
              localeData.message = `${data['nickName']} connected`;
            }
            return localeData;
          case 'chat-message':
            if (data['userId'] === this.loginService.currUserInfo) {
              localeData.yourMessage = true;
              localeData.message = `You: ${data['message']}`;
            } else {
              localeData.message = `${data['nickName']}: ${data['message']}`;
            }
            return localeData;
          case 'user-disconnected':
            localeData.servicesMessage = true;
            if (data['userId'] === this.loginService.currUserInfo) {
              localeData.yourMessage = true;
              localeData.message = `You disconnected`;
            } else {
              localeData.message = `${data['nickName']} disconnected`;
            }
            return localeData;
        }
      })
    );
  }

  sendMessage(msg) {
    this.messageData['message'] = msg;
    this.socket.emit('send-chat-message', this.messageData);
  }
}
