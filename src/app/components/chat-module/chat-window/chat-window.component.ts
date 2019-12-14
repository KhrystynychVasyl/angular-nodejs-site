import { ChatSocketService } from '../../../services/chat-socket.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  private subscription;
  message: string;
  messages: any[] = [
    {
      yourMessage: true,
      servicesMessage: true,
      message: 'You connected'
    },
    {
      yourMessage: false,
      servicesMessage: false,
      message:
        'addd: goasdasd sad adad ad ad ad ad ad adasd sad asd sad sad asd asd as dads ad ad asd ad ad sad a'
    },
    {
      yourMessage: false,
      servicesMessage: true,
      message: 'K2 connected'
    },
    {
      yourMessage: false,
      servicesMessage: true,
      message: 'Stat disconnected'
    },
    {
      yourMessage: true,
      servicesMessage: false,
      message:
        'My: dask djasjhd ajfh afh aksdghfj adslkf hdslf hdsgf hsadkg jdsagk hdsgj hdsagjh salkdgh sadlkg jasdgh asjgdh sajdgh sajgdh dsajhg sajgh dsag'
    }
  ];
  constructor(private chatSocketService: ChatSocketService) {}

  ngOnInit() {
    this.chatSocketService.userConnected();
    // this.chatSocketService.getMessage().subscribe(msg => {
    //   this.messages.push(`${msg['name']}: ${msg['message']}`);
    // });
    // this.chatSocketService.getMessage2().subscribe(msg => {
    //   this.messages.push(`${msg} connected`);
    // });
    // this.chatSocketService.getMessage3().subscribe(msg => {
    //   this.messages.push(`${msg} disconnected`);
    // });
    this.subscription = this.chatSocketService
      .allChatMessage()
      .subscribe(message => this.messages.push(message));
  }

  chatMessage() {
    this.sendMessage(this.message);
    this.message = '';
  }

  sendMessage(msg) {
    this.chatSocketService.sendMessage(msg);
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    this.chatSocketService.close();
    this.subscription.unsubscribe();
  }
}
