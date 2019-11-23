import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormGroup } from "@angular/forms";
import { Product } from "src/app/services/classes/product";

@Component({
  selector: "app-management",
  templateUrl: "./management.component.html",
  styleUrls: ["./management.component.scss"]
})
export class ManagementComponent implements OnInit {
  imageSrc;
  readonly API_images_URL: string = "/api/images";
  readonly API_products_URL: string = "/api/products";
  private urlTempM: string = "need to check";
  private urlTempP: string = "need to check";
  tempImageFile = null;

  addProductForm: FormGroup;

  constructor(private http: HttpClient, public fb: FormBuilder) {
    this.addProductForm = this.fb.group({
      title: [""],
      description: [""],
      price: [""],
      image: [null]
    });
  }
  ngOnInit() {}

  onFileSelect(event) {
    if (event.target.files && event.target.files[0]) {
      if (
        event.target.files[0].type === "image/jpeg" ||
        event.target.files[0].type === "image/png"
      ) {
        this.tempImageFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
          let dataURL = reader.result;
          this.imageSrc = dataURL;
        };
        reader.readAsDataURL(event.target.files[0]);
        this.addProductForm.patchValue({
          image: this.tempImageFile
        });
      } else {
        alert("Choose Image Type File");
      }
    }
  }

  checkImagesUrl() {
    return new Promise((resolve, reject) => {
      let check: boolean;
      this.http
        .get(this.API_images_URL)
        .subscribe(
          list => {
            check = true;
          },
          error => {
            check = false;
          }
        )
        .add(() => {
          this.urlTempM = check
            ? this.API_images_URL
            : "http://localhost:5678" + this.API_images_URL;
          return resolve();
        });
    });
  }

  checkProductsUrl() {
    return new Promise((resolve, reject) => {
      let check: boolean;
      this.http
        .get(this.API_products_URL)
        .subscribe(
          list => {
            check = true;
          },
          error => {
            check = false;
          }
        )
        .add(() => {
          this.urlTempP = check
            ? this.API_products_URL
            : "http://localhost:5678" + this.API_products_URL;
          return resolve();
        });
    });
  }

  uploadNewProduct() {
    const formData = new FormData();
    formData.append("image", this.addProductForm.get("image").value);

    let newProduct = {};
    newProduct["title"] = this.addProductForm.get("title").value;
    newProduct["description"] = this.addProductForm.get("description").value;
    newProduct["price"] = this.addProductForm.get("price").value;

    this.uploadImage(formData, answer => {
      newProduct["imageUrl"] = answer.imageUrl;

      let body: Object = {};

      body = { isMany: false, data: newProduct };
      console.log(body);
      this.checkProductsUrl().then(() => {
        this.http.post(this.urlTempP, body).subscribe(answer => {
          console.log(answer);
        });
      });
    });
  }

  uploadImage(formData, callback) {
    this.checkImagesUrl().then(() => {
      this.http
        .post(this.urlTempM + "?fileType=image&collection=images", formData)
        .subscribe(answer => callback(answer)).closed;
    });
  }
}
