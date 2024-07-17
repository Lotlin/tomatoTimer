/* eslint-disable require-jsdoc */

import {priorityClassList} from './data.js';


export class Task {
  #id;
  #count;

  constructor(title, counter = 0) {
    this.#id = String(Date.now() + Math.floor(Math.random() * 1000));
    this.text = String(title);
    this.#count = counter;
  }

  get id() {
    return this.#id;
  }

  set id(data) {
    console.log(`Невозможно изменить значение id задачи напрямую на ${data}.`);
  }

  get count() {
    return this.#count;
  }

  set count(data) {
    console.log(`Невозможно изменить значение счётчика напрямую на ${data}.`);
  }

  increaseCounter() {
    this.#count += 1;

    return this.#count;
  }

  changeText(data) {
    this.text = String(data);

    return this.text;
  }
}

export class DefaultTask extends Task {
  importance = priorityClassList[0];
  constructor(title, counter = 0) {
    super(title, counter);
  }
}

export class SoSoTask extends Task {
  importance = priorityClassList[1];
  constructor(title, counter = 0) {
    super(title, counter);
  }
}

export class ImportantTask extends Task {
  importance = priorityClassList[2];
  constructor(title, counter = 0) {
    super(title, counter);
  }
}
