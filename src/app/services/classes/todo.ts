import * as moment from "moment";

export class Todo {
  id: number;
  title: string = "";
  complete: boolean = false;
  time: moment.Moment;
  constructor(fields = {}) {
    Object.assign(this, fields);
  }
}
