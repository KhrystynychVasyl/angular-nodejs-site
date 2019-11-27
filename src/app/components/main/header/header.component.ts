import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  status: boolean = true;
  public showClock: boolean = false;
  constructor() {}

  ngOnInit() {}

  @HostListener('window:resize', ['$event'])
  checkShowClock(event) {
    this.showClock = window.innerWidth > 360;
  }
}
