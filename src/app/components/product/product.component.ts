import { ProductsListService } from "./../../services/products-list.service";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Observable } from "rxjs";
import { Product } from "src/app/services/classes/product";
import { tap, map } from "rxjs/operators";

interface IServerResponse {
  items: string[];
  total: number;
}

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  productsListSearch: string;
  productModalRef: BsModalRef;
  @ViewChild("productModalTemplate", { static: false })
  productModalTemplate: TemplateRef<any>;
  //productsList: Observable<Product[]>
  productsList: Product[];
  config: any;

  constructor(
    private modalService: BsModalService,
    private productsListService: ProductsListService
  ) {
    this.productsListService.modalTrigger.subscribe(state => {
      this.openProductModal();
    });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  // get productsList(): Observable<Product[]> {
  //   return this.productsListService.ProductsList;
  // }

  ngOnInit() {
    //this.productsList = this.productsListService.getProductsList()
    this.productsListService.getProductsList().subscribe(list => {
      this.productsList = list;
      this.config = {
        itemsPerPage: 27,
        currentPage: 1,
        totalItems: this.productsList.length
      };
    });
  }

  openProductModal() {
    this.productModalRef = this.modalService.show(this.productModalTemplate);
  }

  get CurrProduct() {
    return this.productsListService.getCurrProduct();
  }
}
