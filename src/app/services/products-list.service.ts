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

  

  arrProductsList1: Product[] = [
    {
      _id: "",
      title: "Large drone",
      imageUrl: "drone-large.jpg",
      description: "Large drone for most critical missions. Can carry load.",
      price: 499.99
    },
    {
      _id: "",
      title: "Small drone",
      imageUrl: "drone-small.jpg",
      description: "Small drone. Can fly undetected.",
      price: 199.99
    },
    {
      _id: "",
      title: "Blue drone",
      imageUrl: "drone-blue.jpg",
      description: "Nice-looking drone in blue color. Has built-in HD camera",
      price: 249.99
    },
    {
      _id: "",
      title: "Red drone",
      imageUrl: "drone-red.jpg",
      description: "Nice-looking drone in red color",
      price: 229.99
    },
    {
      _id: "",
      title: "Black gyroboard",
      imageUrl: "gyroboard-black.jpg",
      description: "Black gyroboard to match your style",
      price: 729.99
    },
    {
      _id: "",
      title: "White gyroboard",
      imageUrl: "gyroboard-white.jpg",
      description: "White gyroboard with blue lights",
      price: 829.99
    },
    {
      _id: "",
      title: "Tesla Model X",
      imageUrl: "tesla-x.jpg",
      description: "Best crossover in the World",
      price: 99999.99
    },
    {
      _id: "",
      title: "Tesla Roadster",
      imageUrl: "tesla-roadster.jpg",
      description: "Best sports car in the World",
      price: 249999.99
    },
    {
      _id: "",
      title: "Odyssey EVO",
      imageUrl: "Odyssey-evo.jpg",
      description:
        "Современный 9-ти ячеечный эллиптический основной парашют-крыло класса «high performance». Рекомендуется для опытных пилотов.",
      price: 1800.0
    }
  ];
  arrProductsList: Product[] = [
    {
      title: "Blue drone",
      description: "Nice-looking drone in blue color. Has built-in HD camera",
      price: 249.99,
      imageUrl: "/api/images/7f7e11861029f78ee8cdcccdc7be233f.jpg",
      _id: "5dd9609f92bb030fa8046cce"
    },
    {
      title: "Blue drone",
      description: "Nice-looking drone in blue color. Has built-in HD camera",
      price: 249.99,
      imageUrl: "/api/images/7f7e11861029f78ee8cdcccdc7be233f.jpg",
      _id: "5dd9609f92bb030fa8046cce"
    },
    {
      title: "Blue drone",
      description: "Nice-looking drone in blue color. Has built-in HD camera",
      price: 249.99,
      imageUrl: "/api/images/7f7e11861029f78ee8cdcccdc7be233f.jpg",
      _id: "5dd9609f92bb030fa8046cce"
    },
    {
      title: "Blue drone",
      description: "Nice-looking drone in blue color. Has built-in HD camera",
      price: 249.99,
      imageUrl: "/api/images/7f7e11861029f78ee8cdcccdc7be233f.jpg",
      _id: "5dd9609f92bb030fa8046cce"
    }
  ];

  get random() {
    return Math.floor(Math.random() * 3.99);
  }

  constructor(private http: HttpClient) {}

  getProductsList(): Observable<Product[]> {
    return new Observable(someStream => {
      if ((this.countLocal === 1)) {
        this.getHttpProductsList();
        ++this.countLocal
      }
      setTimeout(
        () =>
          someStream.next(
            new Array(71)
              .fill(() => this.arrProductsList[this.random])
              .map(el => (el = this.arrProductsList[this.random]))
          ),
        1000
      );
    });
  }

  getHttpProductsList() {
    this.arrProductsList = this.arrProductsList.map(el => {
        el.imageUrl = this.baseUrl + el.imageUrl;
      return el;
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
