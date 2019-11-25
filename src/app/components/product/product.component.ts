import { ProductsListService } from "./../../services/products-list.service";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Product } from "src/app/services/classes/product";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  baseUrl = environment.baseUrl;

  productsListSearch: string;
  productModalRef: BsModalRef;
  @ViewChild("productModalTemplate", { static: false })
  productModalTemplate: TemplateRef<any>;
  productsList: Product[];
  config: any;

  constructor(
    private modalService: BsModalService,
    private productsListService: ProductsListService
  ) {}

  pageChanged(event) {
    this.config.currentPage = event;
  }

  ngOnInit() {
    this.productsListService.getProductsList().subscribe(list => {
      if (this.baseUrl) {
        this.productsList = list.map(el => {
          el.imageUrl = this.baseUrl + el.imageUrl;
          return el;
        });
      } else {
        this.productsList = list;
      }
      this.config = {
        itemsPerPage: 8,
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
