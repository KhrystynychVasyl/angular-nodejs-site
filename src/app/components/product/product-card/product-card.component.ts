import { ProductsListService } from "../../../services/products-list.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Product } from "src/app/services/classes/product";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
  @Input("productCardText") productCardText: string;
  @Input("productItemInChild") productItem: Product;
  @Output() showModal = new EventEmitter()

  constructor(private productsListService: ProductsListService) {}

  ngOnInit() {}


  onClickShow() {
    this.showModal.emit()
    this.productsListService.infoCurrProductModal(this.productItem);
  }

  
}
