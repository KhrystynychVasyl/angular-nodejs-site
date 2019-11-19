import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  productsListSearch: string;
  productModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  productImage = [
    "drone-blue.jpg",
    "drone-large.jpg",
    "drone-red.jpg",
    "drone-small.jpg",
    "gyroboard-black.jpg",
    "gyroboard-white.jpg",
    "Odyssey-evo.jpg",
    "tesla-roadster.jpg",
    "tesla-x.jpg",    "drone-blue.jpg",
    "drone-large.jpg",
    "drone-red.jpg",
    "drone-small.jpg",
    "gyroboard-black.jpg",
    "gyroboard-white.jpg",
    "Odyssey-evo.jpg",
    "tesla-roadster.jpg",
    "tesla-x.jpg",
  ];

  ngOnInit() {}

  openProductModal(template: TemplateRef<any>) {
    this.productModalRef = this.modalService.show(template);
  }
}
