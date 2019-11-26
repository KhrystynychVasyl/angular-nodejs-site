export class CartItem {
  prod;
  count: number;
  constructor(fields) {
    Object.assign(this, fields);
  }
}
