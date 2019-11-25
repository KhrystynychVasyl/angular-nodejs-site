import { HttpClient } from "@angular/common/http";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./classes/product";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProductsListService {
  currProduct: Product;
  baseUrl = environment.baseUrl;

  readonly API_productsList_URL = this.baseUrl + "/api/products";
  countLocal = 1;

  tempProductsList: Product[] = [
    {
      _id: "",
      title: "Tesla Roadster",
      imageUrl: "/api/images/cd651d7b0509197e95f3f50fb6510c78.jpg",
      description: "Best sports car in the World",
      price: 249999.99
    }
  ];

  get random() {
    return Math.floor(Math.random() * (this.tempProductsList.length - 0.01));
  }

  constructor(private http: HttpClient) {}

  getProductsList(): Observable<Product[]> {
    return this.getHttpProductsList();
  }

  getHttpProductsList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_productsList_URL);
  }

  infoCurrProductModal(product: Product) {
    this.currProduct = product;
  }

  getCurrProduct() {
    return this.currProduct;
  }
}
