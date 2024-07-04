/* eslint-disable require-jsdoc */
export class Tomato {
  #taskTimeToComplite;
  #breakTime;
  #bigBreakTime;
  #tasks;
  constructor(data = {}) {
    this.#taskTimeToComplite = data.taskTimeToComplite ?
      data.taskTimeToComplite : 25;
    this.#breakTime = data.breakTime ? data.breakTime : 5;
    this.#bigBreakTime = data.bigBreakTime ? data.bigBreakTime : 15;
    this.#tasks = data.tasks ? data.tasks : [];
    this.activeTask = null;
  }

  addTask(taskData) {
    this.#tasks.push(taskData);
    console.log('this.#tasks: ', this.#tasks);
  }

  setActiveTask(taskId) {
    this.activeTask = taskId;
    console.log('this.activeTask: ', this.activeTask);
  }

  runTaskTimer(activeTask) {
    if (!activeTask) {
      console.log(`Не выбрана ни одна активная задача`);
      return;
    }

    console.log('Данные задачи до отработки таймеров: ', activeTask);

    const timerDoTask = setInterval(() => {
      // toDO временная защита от бесконечного вызова таймера
      activeTask.increaseCounter();
      console.log(
          `Таймер окончания работы сработал ${activeTask.counter}-й раз.`,
      );
      if (activeTask.counter === 5) {
        clearInterval(timerDoTask);
        console.log('Данные задачи после отработки таймеров: ', activeTask);

        return;
      }

      if (activeTask.counter % 4 !== 0 || !activeTask.counter) {
        console.log('маленький перерыв начат');
        setTimeout(() => {
          console.log('маленький перерыв окончен');
        }, (this.#breakTime * 60 * 1000));
      } else {
        console.log('большой перерыв начат');
        setTimeout(() => {
          console.log('большой перерыв окончен');
        }, (this.#bigBreakTime * 60 * 1000));
      }
    }, (this.#taskTimeToComplite * 60 * 1000));
  }


  get taskTimeToComplite() {
    return this.#taskTimeToComplite;
  }

  set taskTimeToComplite(data) {
    console.log(`Нельзя поменять время на выполнение задачи на ${data}`);
  }

  get breakTime() {
    return this.#breakTime;
  }

  set breakTime(data) {
    console.log(`Нельзя поменять время паузы на ${data}`);
  }

  get bigBreakTime() {
    return this.#bigBreakTime;
  }

  set bigBreakTime(data) {
    console.log(`Нельзя поменять время большой паузы на ${data}`);
  }

  get tasks() {
    return this.#tasks;
  }

  set tasks(data) {
    console.log(`Нельзя поменять массив задач на ${data}`);
  }
}
