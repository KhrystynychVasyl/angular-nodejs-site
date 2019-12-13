import { merge } from 'rxjs';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {
  constructor(private socket: Socket) {}

  open() {
    this.socket.connect();
  }

  close() {
    this.socket.disconnect();
  }

  userConnected(name) {
    this.open();
    this.socket.emit('new-user', name);
  }

  getMessage() {
    return this.socket.fromEvent('chat-message');
  }
  getMessage2() {
    return this.socket.fromEvent('user-connected');
  }
  getMessage3() {
    return this.socket.fromEvent('user-disconnected');
  }
  allMessage() {
    return merge(this.getMessage(), this.getMessage2(), this.getMessage3());
  }

  sendMessage(msg) {
    this.socket.emit('send-chat-message', msg);
  }
}
