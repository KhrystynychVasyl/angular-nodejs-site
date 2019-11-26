import { ProductsListService } from '../../../services/products-list.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/services/classes/product';
import { BuyCartListService } from 'src/app/services/buy-cart-list.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('productCardText') productCardText: string;
  @Input('productItemInChild') productItem: Product;
  @Output() showModal = new EventEmitter();

  constructor(
    private productsListService: ProductsListService,
    private buyCartListService: BuyCartListService
  ) {}

  ngOnInit() {}

  onClickShow() {
    this.showModal.emit();
    this.productsListService.infoCurrProductModal(this.productItem);
  }
  
  onClickAddToCart(){
    this.buyCartListService.addProductToCart(this.productItem)
  }
  
}
