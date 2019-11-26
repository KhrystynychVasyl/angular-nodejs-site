export class User {
  _id: string;
  login = '';
  password = '';
  access = false;
  constructor(fields = {}) {
    Object.assign(this, fields);
  }
}
