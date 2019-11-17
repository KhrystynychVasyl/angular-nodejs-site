export class User {
  _id: string;
  id: string = "";
  login: string = "";
  password: string = "";
  access: boolean = false;
  constructor(fields = {}) {
    Object.assign(this, fields);
  }
}
