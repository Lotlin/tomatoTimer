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
    // this.tasks = data.tasks ? data.tasks : [];
    // toDO заменить?
    // this.tasks = [JSON.parse(localStorage.getItem('tomato') || '[]')];
    this.tasks = [];
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
      activeTaskText: '',
      state: 'stop',
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

  // toDo нужно ли?
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

    this.updateTextAndImportanceTaskInLocalStorage(editedTask);
  }

  isClickedActiveTaskInListOfTasks() {
    return this.state.activeTaskId === this.activeTask.id &&
        this.state.activeTaskText === this.activeTask.text;
  }

  setActiveTask(id) {
    this.activeTask = this.getTaskById(id);

    if (this.isClickedActiveTaskInListOfTasks() &&
      this.state.state === 'start') {
      return;
    }

    this.stopTimer();
    this.state.status = 'work';
    this.state.currentTomatoes = 0;
    this.state.activeTaskId = id;
    this.state.activeTaskText = this.activeTask.text;
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

  getTaskCountELem(taskId) {
    const activeTaskELem = document.querySelector(`[data-id = '${taskId}']`);
    const countElem = activeTaskELem.querySelector('.count-number');

    return countElem;
  }

  startTimer(activeTask, timerCounterElem) {
    if (!activeTask) {
      console.log(`Не выбрана ни одна активная задача`);
      return;
    }

    this.state.state = 'start';

    const activeTasCountElem = this.getTaskCountELem(this.state.activeTaskId);
    const windowTomatoPannel =
      document.querySelector('.window__panel-task-text');
    windowTomatoPannel.textContent = `Томат ${this.state.currentTomatoes + 1}`;

    this.state.timerId = setInterval(() => {
      this.state.timeLeft -= 1;
      this.showTime(this.state.timeLeft, timerCounterElem);

      if (!this.state.timeLeft) {
        if (this.state.status === 'work') {
          activeTask.increaseCounter();
          // toDO записывать данные в LS + при изменении наименования тоже
          this.updateCountTaskInLocalStorage(activeTask);
          this.state.currentTomatoes += 1;
          activeTasCountElem.textContent = activeTask.count;
          windowTomatoPannel.textContent =
            `Томат ${this.state.currentTomatoes + 1}`;

          if (this.state.currentTomatoes % this.state.count) {
            this.state.status = 'break';
            windowTomatoPannel.textContent = 'Перерыв';
          } else {
            this.state.status = 'relax';
            windowTomatoPannel.textContent = 'Большой перерыв';
          }
        } else {
          this.state.status = 'work';
          windowTomatoPannel.textContent =
          `Томат ${this.state.currentTomatoes + 1}`;
        }
        this.state.timeLeft = this.state[this.state.status] * 60;
      }
    }, 1000);
  }

  stopTimer() {
    this.state.state = 'stop';
    clearInterval(this.state.timerId);
  }

  setItemLocalStorage(task) {
    const currentTasks = this.getLocalStorageTomatoTasks();

    currentTasks.push(task);

    localStorage.setItem('tomato', JSON.stringify(currentTasks));
  }

  getLocalStorageTomatoTasks() {
    return JSON.parse(localStorage.getItem('tomato') || '[]');
  }

  removeTaskFromLocalStorageTomatoTasks(taskId) {
    let currentTasks = this.getLocalStorageTomatoTasks();

    currentTasks = currentTasks.filter((item) =>
      Number(item.id) !== Number(taskId));

    localStorage.setItem('tomato', JSON.stringify(currentTasks));
  }

  updateTextAndImportanceTaskInLocalStorage(task) {
    const currentTasks = this.getLocalStorageTomatoTasks();

    currentTasks.forEach(item => {
      if (Number(item.id) === Number(task.id)) {
        item.text = task.text;
        item.importance = task.importance;
      }
    });

    localStorage.setItem('tomato', JSON.stringify(currentTasks));
  }

  updateCountTaskInLocalStorage(task) {
    const currentTasks = this.getLocalStorageTomatoTasks();

    currentTasks.forEach(item => {
      if (Number(item.id) === Number(task.id)) {
        item.count = task.count;
      }
    });

    localStorage.setItem('tomato', JSON.stringify(currentTasks));
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
