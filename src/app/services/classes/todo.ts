export class Todo {
  id: number;
  title: string = "";
  complete: boolean = false;
  constructor(fields = {}) {
    Object.assign(this, fields);
  }
}
