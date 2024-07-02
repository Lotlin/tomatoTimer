/* eslint-disable require-jsdoc */
export class Task {
  #title;
  #id;
  #counter;

  constructor(title, counter = 0) {
    this.#title = String(title);
    this.#id = String(Date.now());
    this.#counter = counter;
  }

  get title() {
    return this.#title;
  }

  set title(data) {
    console.log(`Невозможно изменить название задачи напрямую на '${data}.'`);
  }

  get id() {
    return this.#id;
  }

  set id(data) {
    console.log(`Невозможно изменить значение id задачи напрямую на ${data}.`);
  }

  get counter() {
    return this.#counter;
  }

  set counter(data) {
    console.log(`Невозможно изменить значение счётчика напрямую на ${data}.`);
  }

  increaseCounter() {
    this.#counter += 1;

    console.log(`Значение счётчика увеличено на 1 при помощи метода.`);
  }

  changeTitle(data) {
    this.#title = String(data);

    console.log(`Название задачи изменено на '${data}' при помощи метода.`);
  }
}
