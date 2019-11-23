import { HttpClient } from "@angular/common/http";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./classes/product";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProductsListService {
  @Output() modalTrigger = new EventEmitter<boolean>();
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
    return new Observable(someStream => {
      if (this.countLocal === 1) {
        this.getHttpProductsList();
        ++this.countLocal;
      }
      setTimeout(
        () =>
          someStream.next(
            new Array(67)
              .fill(() => this.tempProductsList[this.random])
              .map(el => (el = this.tempProductsList[this.random]))
          ),
        5000
      );
    });
  }

  getHttpProductsList() {
    this.http.get<Product[]>(this.API_productsList_URL).subscribe(list => {
      this.tempProductsList = list.map(el => {
        el.imageUrl = this.baseUrl + el.imageUrl;
        return el;
      });
    });
  }

  infoCurrProductModal(product: Product) {
    this.currProduct = product;
    this.modalTrigger.emit(true);
  }

  getCurrProduct() {
    return this.currProduct;
  }
}
