import { ProductsListService } from './../../services/products-list.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/services/classes/product';
import { environment } from 'src/environments/environment';

import { NgxSpinnerService } from 'ngx-spinner';
import { BuyCartListService } from 'src/app/services/buy-cart-list.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  baseUrl = environment.baseUrl;

  productsList: Product[];
  productsListSearch: string;
  modalRef: BsModalRef;
  @ViewChild('referToProductModalTemplate', { static: false })
  productModalTemplate: TemplateRef<any>;
  hide = true;
  config: any;

  constructor(
    private modalService: BsModalService,
    private productsListService: ProductsListService,
    private spinnerService: NgxSpinnerService,
    private buyCartListService: BuyCartListService
  ) {}

  pageChanged(event) {
    this.config.currentPage = event;
  }

  ngOnInit() {
    this.spinnerService.show();
    this.productsListService.getProductsList().subscribe(list => {
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinnerService.hide();
      }, 1000);
      if (this.baseUrl) {
        this.productsList = list.map(el => {
          el.imageUrl = this.baseUrl + el.imageUrl;
          return el;
        });
      } else {
        this.productsList = list;
      }
      
      this.config = {
        itemsPerPage: 16,
        currentPage: 1,
        totalItems: this.productsList.length
      };
      this.hide = this.config.totalItems > this.config.itemsPerPage;
    });
  }

  openProductModal() {
    this.modalRef = this.modalService.show(this.productModalTemplate);
  }

  get CurrProduct() {
    return this.productsListService.getCurrProduct();
  }

  onClickAddToCart(product: Product) {
    this.buyCartListService.addProductToCart(product);
  }
}
