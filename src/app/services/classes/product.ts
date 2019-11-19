export class Product {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  constructor(fields) {
    Object.assign(this, fields);
  }
}
