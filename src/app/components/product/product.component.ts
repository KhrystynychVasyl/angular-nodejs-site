import { ProductsListService } from "./../../services/products-list.service";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Observable } from "rxjs";
import { Product } from "src/app/services/classes/product";

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
  productsList: Observable<Product[]>


  constructor(
    private modalService: BsModalService,
    private productsListService: ProductsListService
  ) {}

  // get productsList(): Observable<Product[]> {
  //   return this.productsListService.ProductsList;
  // }

  ngOnInit() {
    this.productsListService.modalTrigger.subscribe(state => {
      this.openProductModal();
    });
    this.productsList = this.productsListService.getProductsList()
  }

  openProductModal() {
    this.productModalRef = this.modalService.show(this.productModalTemplate);
  }

  get CurrProduct() {
    return this.productsListService.getCurrProduct();
  }
}
