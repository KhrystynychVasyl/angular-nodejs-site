import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  status: boolean = false;
  

  constructor() {}

  ngOnInit() {
    setTimeout(() => (this.status = true), 3000);
  }
}
