import { Product } from 'src/app/services/classes/product';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BuyCartListService } from 'src/app/services/buy-cart-list.service';

@Component({
  selector: 'app-buyCart',
  templateUrl: './buyCart.component.html',
  styleUrls: ['./buyCart.component.scss']
})
export class BuyCartComponent implements OnInit {
  modalRef: BsModalRef;
  @ViewChild('referToBuyCartModalTemplate', { static: false })
  buyCartModalTemplate: TemplateRef<any>;

  constructor(
    private modalService: BsModalService,
    private buyCartListService: BuyCartListService
  ) {}

  ngOnInit() {}

  openProductModal() {
    this.modalRef = this.modalService.show(this.buyCartModalTemplate);
  }

  get cartProductList() {
    return this.buyCartListService.getCartProductList();
  }

  get totalOrderPrice() {
    return this.buyCartListService.getTotalOrderPrice();
  }

  get totalCount() {
    return this.buyCartListService.getTotalItemCount();
  }

  addProduct(product: Product) {
    this.buyCartListService.addProductToCart(product);
  }

  deleteProduct(product: Product) {
    this.buyCartListService.deleteProductFromCart(product);
  }
}
