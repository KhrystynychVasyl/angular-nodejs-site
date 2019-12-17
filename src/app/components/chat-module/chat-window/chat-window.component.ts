import { ChatSocketService } from '../../../services/chat-socket.service';
import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ViewChild,
  ViewChildren,
  ElementRef,
  QueryList,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;

  private itemContainer: any;
  private scrollContainer: any;
  private isNearBottom = true;

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
        'My: dask djasjhd ajfh afh aksd ghfj adslkf hdslf hdsgf hsadkg jdsagk hdsgj hdsagjh salkdgh sadlkg jasdgh asjgdh sajdgh sajgdh dsajhg sajgh dsag'
    },
    {
      yourMessage: true,
      servicesMessage: false,
      message:
        'My: dask djasjhd ajfh afh aksd ghfj adslkf hdslf hdsgf hsadkg jdsagk hdsgj hdsagjh salkdgh sadlkg jasdgh asjgdh sajdgh sajgdh dsajhg sajgh dsag'
    }
  ];
  constructor(private chatSocketService: ChatSocketService) {}
  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());


  }

  ngOnInit() {

    this.chatSocketService.userConnected();
    this.subscription = this.chatSocketService
      .allChatMessage()
      .subscribe(message => this.messages.push(message));
  }

  private onItemElementsChanged(): void {
    if (this.isNearBottom) {
      this.scrollToBottom();
    }
  }
  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  private isUserNearBottom(): boolean {
    const threshold = 150;
    const position =
      this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;
    return position > height - threshold;
  }

  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
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
