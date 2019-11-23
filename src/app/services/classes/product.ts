export class Product {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  constructor(fields = {}) {
    Object.assign(this, fields);
  }
}
