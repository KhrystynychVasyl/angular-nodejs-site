import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-management",
  templateUrl: "./management.component.html",
  styleUrls: ["./management.component.scss"]
})
export class ManagementComponent implements OnInit {
  imageSrc;

  constructor() {}

  ngOnInit() {}

  readURL(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);

      const reader = new FileReader(); 
      reader.onload = e =>{ 
        var dataURL = reader.result;
        var output = document.getElementById('output');
        this.imageSrc = dataURL;
      }
      reader.readAsDataURL(file);
    }
  }
}
