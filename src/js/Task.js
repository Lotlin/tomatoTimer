/* eslint-disable require-jsdoc */
export class Task {
  constructor(title, id = NaN, count = 0) {
    this.id = id ? id : String(Date.now() + Math.floor(Math.random() * 1000));
    this.text = String(title);
    this.count = count;
  }

  increaseCounter() {
    this.count += 1;

    return this.count;
  }

  changeText(data) {
    this.text = String(data);

    return this.text;
  }
}

export class DefaultTask extends Task {
  constructor(title, priorityClassList, id = NaN, count = 0) {
    console.log(id);
    super(title, id, count);
    this.importance = priorityClassList[0];
  }
}

export class SoSoTask extends Task {
  constructor(title, priorityClassList, count = 0) {
    super(title, count);
    this.importance = priorityClassList[1];
  }
}

export class ImportantTask extends Task {
  constructor(title, priorityClassList, count = 0) {
    super(title, count);
    this.importance = priorityClassList[2];
  }
}
