import { HttpClient } from "@angular/common/http";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./classes/product";

@Injectable({
  providedIn: "root"
})
export class ProductsListService {
  @Output() modalTrigger = new EventEmitter<boolean>();
  currProduct: Product;
  readonly API_productsList_URL = "/public/";
  private urlTempP: string = "";
  arrProductsList: Product[] = [
    {
      id: 1,
      title: "Large drone",
      imageUrl: "drone-large.jpg",
      description: "Large drone for most critical missions. Can carry load.",
      price: 499.99
    },
    {
      id: 2,
      title: "Small drone",
      imageUrl: "drone-small.jpg",
      description: "Small drone. Can fly undetected.",
      price: 199.99
    },
    {
      id: 3,
      title: "Blue drone",
      imageUrl: "drone-blue.jpg",
      description: "Nice-looking drone in blue color. Has built-in HD camera",
      price: 249.99
    },
    {
      id: 4,
      title: "Red drone",
      imageUrl: "drone-red.jpg",
      description: "Nice-looking drone in red color",
      price: 229.99
    },
    {
      id: 5,
      title: "Black gyroboard",
      imageUrl: "gyroboard-black.jpg",
      description: "Black gyroboard to match your style",
      price: 729.99
    },
    {
      id: 6,
      title: "White gyroboard",
      imageUrl: "gyroboard-white.jpg",
      description: "White gyroboard with blue lights",
      price: 829.99
    },
    {
      id: 7,
      title: "Tesla Model X",
      imageUrl: "tesla-x.jpg",
      description: "Best crossover in the World",
      price: 99999.99
    },
    {
      id: 8,
      title: "Tesla Roadster",
      imageUrl: "tesla-roadster.jpg",
      description: "Best sports car in the World",
      price: 249999.99
    },
    {
      id: 9,
      title: "Odyssey EVO",
      imageUrl: "Odyssey-evo.jpg",
      description:
        "Современный 9-ти ячеечный эллиптический основной парашют-крыло класса «high performance». Рекомендуется для опытных пилотов.",
      price: 1800.0
    }
  ];

  arrTemp: Product[] = [];

  get random() {
    return Math.floor(Math.random() * 8.99);
  }

  constructor(private http: HttpClient) {}

  getProductsList(): Observable<Product[]> {
    return new Observable(someStream => {
      this.getHttpProductsList();
      setTimeout(
        () =>
          someStream.next(
            new Array(27)
              .fill(() => this.arrTemp[this.random])
              .map(el => (el = this.arrTemp[this.random]))
          ),
        3000
      );
      // setInterval(
      //   () =>
      //     someStream.next([
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random],
      //       this.arrProductsList[this.random]
      //     ]),
      //   10000
      // );
    });
  }

  getHttpProductsList() {
    let check: boolean;
    this.http
      .get(this.API_productsList_URL)
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
          ? this.API_productsList_URL
          : "http://localhost:5678" + this.API_productsList_URL;

        this.arrTemp = this.arrProductsList.map(el => {
          el.imageUrl = this.urlTempP + el.imageUrl;
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
