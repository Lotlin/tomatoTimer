import {DefaultTask, ImportantTask, SoSoTask} from '../Task.js';

/* eslint-disable require-jsdoc */
export class Model {
  constructor(data) {
    this.data = data;
    this.priorityClassList = ['default', 'so-so', 'important'];
    this.priorityClassesNum = this.priorityClassList.length;
    this.priorityBtnDefaultClassList = 'button button-importance default';
  }
}

export class TaskModel extends Model {
  constructor(task = {}) {
    super(task);
    this.classList = [DefaultTask, SoSoTask, ImportantTask];
  }
}
