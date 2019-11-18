import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Observable, interval } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";
import * as moment from "moment";

@Component({
  selector: "app-clock",
  templateUrl: "./clock.component.html",
  styleUrls: ["./clock.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent implements OnInit {
  pageLoaded: moment.Moment;
  time: Observable<string>;
  constructor() {}

  ngOnInit() {
    this.getTime();
  }

  getTime() {
    this.time = interval(1000*60).pipe(
      // why you need 1s interval with HH:mm time format simply update it every minute not every second.
      map(() => {
        this.pageLoaded = moment(new Date()); // you need the value of now not the value of the initialized time.
        return this.pageLoaded.format("HH:mm A");
      })
    );
  }
}
