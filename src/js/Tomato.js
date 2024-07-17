/* eslint-disable require-jsdoc */
export class Tomato {
  #workTime;
  #breakTime;
  #relaxTime;
  constructor(data = {}) {
    if (Tomato._instance) {
      return Tomato._instance;
    }

    this.#workTime = data.workTime ?
    // toDO вернуть 25
      data.workTime : 0.3;
    // toDO вернуть 5
    this.#breakTime = data.breakTime ? data.breakTime : 0.15;
    // toDO вернуть 15
    this.#relaxTime = data.relaxTime ? data.relaxTime : 0.2;
    this.tasks = data.tasks ? data.tasks : [];
    this.activeTask = null;
    this.state = {
      work: this.#workTime,
      break: this.#breakTime,
      relax: this.#relaxTime,
      status: 'work',
      count: 4,
      timeLeft: this.#workTime * 60,
      timerId: 0,
      currentTomatoes: 0,
      activeTaskId: NaN,
    };

    Tomato._instance = this;
  }

  getTaskById(id) {
    const task = Object.values(this.tasks)
        .find(task => task.id === id);

    return task;
  }

  addTask(taskData) {
    this.tasks.push(taskData);
  }

  delTask(id) {
    const tasksArr = this.tasks
        .filter(task => task.id !== id);

    this.tasks = tasksArr;

    return this.tasks;
  }

  editTask(id, text, importance) {
    const editedTask = this.getTaskById(id);
    editedTask.text = editedTask.changeText(text);
    editedTask.importance = importance;
  }

  isClickedActiveTaskInListOfTasks() {
    return this.state.activeTaskId === this.activeTask.id;
  }

  setActiveTask(id) {
    this.activeTask = this.getTaskById(id);

    if (this.isClickedActiveTaskInListOfTasks()) {
      return;
    }

    this.stopTimer();
    this.state.status = 'work';
    this.state.currentTomatoes = 0;
    this.state.activeTaskId = id;
    this.state.timeLeft = this.#workTime * 60;

    return this.activeTask;
  }

  addZeroIfNeeded(number) {
    const num = number;

    return num < 10 ? '0' + num : num;
  }

  showTime(time, timerCounterElem) {
    const minutes = this.addZeroIfNeeded(Math.floor(time / 60));
    const seconds = this.addZeroIfNeeded(time % 60);

    timerCounterElem.textContent = `${minutes}:${seconds}`;
  }


  startTimer(activeTask, timerCounterElem) {
    console.log('activeTask: ', activeTask);
    if (!activeTask) {
      console.log(`Не выбрана ни одна активная задача`);
      return;
    }

    this.state.timerId = setInterval(() => {
      this.state.timeLeft -= 1;
      this.showTime(this.state.timeLeft, timerCounterElem);

      // toDO добавить вывод инфо о помидорке
      if (!this.state.timeLeft) {
        if (this.state.status === 'work') {
          activeTask.increaseCounter();
          console.log('activeTask: ', activeTask);
          this.state.currentTomatoes += 1;

          if (this.state.currentTomatoes % this.state.count) {
            this.state.status = 'break';
          } else {
            this.state.status = 'relax';
          }
        } else {
          this.state.status = 'work';
        }
        this.state.timeLeft = this.state[this.state.status] * 60;
        console.log('this.state.timeLeft: ', this.state.timeLeft);
      }
      console.log(this.state.status);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.state.timerId);
  }

  get workTime() {
    return this.#workTime;
  }

  set workTime(data) {
    console.log(`Нельзя поменять время на выполнение задачи на ${data}`);
  }

  get breakTime() {
    return this.#breakTime;
  }

  set breakTime(data) {
    console.log(`Нельзя поменять время паузы на ${data}`);
  }

  get relaxTime() {
    return this.#relaxTime;
  }

  set relaxTime(data) {
    console.log(`Нельзя поменять время большой паузы на ${data}`);
  }
}
