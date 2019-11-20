export class Product {
  _id: string;
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  constructor(fields = {}) {
    Object.assign(this, fields);
  }
}
