export class Key {
  _id: string;
  key: string;
  constructor(fields = {}) {
    Object.assign(this, fields);
  }
}
