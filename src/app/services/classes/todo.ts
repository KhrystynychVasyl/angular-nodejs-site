import * as moment from 'moment';

export class Todo {
  id: number;
  title = '';
  complete = false;
  time: moment.Moment;
  _id: string;
  constructor(fields = {}) {
    Object.assign(this, fields);
  }
}
