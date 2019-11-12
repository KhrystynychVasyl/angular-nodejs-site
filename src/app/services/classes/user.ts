export class User {
  id: string = "";
  name: string = "";
  password: string = "";
  access: boolean = false;
  constructor(fields) {
    Object.assign(this, fields);
  }
}
