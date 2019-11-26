import { CartItem } from './classes/cart-item';
import { Product } from 'src/app/services/classes/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuyCartListService {
  cartProductList: CartItem[] = [];
  constructor() {}

  getCartProductList() {
    return this.cartProductList;
  }

  getTotalOrderPrice() {
    return this.cartProductList
      .reduce((acc, el) => {
        return acc + el.count * el.prod.price;
      }, 0)
      .toFixed(2);
  }

  getTotalItemCount() {
    return this.cartProductList.reduce((acc, el) => {
      return acc + el.count;
    }, 0);
  }

  addProductToCart(product: Product) {
    let tempProd = this.cartProductList.find(el => el.prod._id === product._id);
    if (tempProd) {
      this.cartProductList = this.cartProductList.map(el => {
        if (el.prod._id === product._id) {
          el.count += 1;
        }
        return el;
      });
    } else {
      this.cartProductList.push({ prod: product, count: 1 });
    }
  }

  deleteProductFromCart(product: Product) {
    let tempProd = this.cartProductList.find(el => el.prod._id === product._id);
    if (tempProd.count > 1) {
      this.cartProductList = this.cartProductList.map(el => {
        if (el.prod._id === product._id) {
          el.count -= 1;
        }
        return el;
      });
    } else {
      this.cartProductList = this.cartProductList.filter(
        el => el.prod._id !== product._id
      );
    }
  }
}
