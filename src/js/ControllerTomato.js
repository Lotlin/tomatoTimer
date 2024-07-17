/* eslint-disable require-jsdoc */
export class ControllerTomato {
  constructor(tomato, TomatoModel) {
    this.tomato = tomato;
    this.model = TomatoModel;
  }

  getCurrentPriorityIndex(priorityBtn) {
    let currentPriorityBtnClassIndex = NaN;

    for (let i = 0; i < this.model.priorityClassesNum; i++) {
      for (let j = 0; j < priorityBtn.classList.length; j++) {
        if (this.model.priorityClassList[i] === priorityBtn.classList[j]) {
          currentPriorityBtnClassIndex = i;
        }
      }
    }

    return currentPriorityBtnClassIndex;
  }

  getCurrentPriorityClass(priorityBtn, currentIndex) {
    let currentPriorityClass = NaN;
    for (let i = 0; i < priorityBtn.classList.length; i++) {
      if (priorityBtn.classList[i] ===
          this.model.priorityClassList[currentIndex]) {
        currentPriorityClass = priorityBtn.classList[i];
      }
    }

    return currentPriorityClass;
  }

  createTaskInstance(TaskClass, taskText, id = NaN, count = 0) {
    return new TaskClass(taskText, this.model.priorityClassList, id, count);
  }

  restoreTaskInstance(task) {
    for (let i = 0; i < this.model.priorityClassesNum; i++) {
      if (task.importance === this.model.priorityClassList[i]) {
        const restoredTask = this.createTaskInstance(
            this.model.classList[i],
            task.text,
            task.id,
            task.count,
        );

        return restoredTask;
      }
    }
  }

  getPriorityBtn(form) {
    return form.querySelector('.button-importance');
  }

  changePriorityIndex(priorityIndex) {
    let newPriorityIndex = priorityIndex + 1;

    if (newPriorityIndex > 2) newPriorityIndex = 0;

    return newPriorityIndex;
  }

  changePriorityBtnClass(priorityBtn, currentPriorityClass, newPriorityIndex) {
    priorityBtn.classList
        .replace(currentPriorityClass,
            this.model.priorityClassList[newPriorityIndex]);
  }

  changePriorityBtnColor(priorityBtn) {
    const priorityIndex = this.getCurrentPriorityIndex(priorityBtn);
    const currentPriorityClass =
      this.getCurrentPriorityClass(priorityBtn, priorityIndex);

    const newPriorityIndex = this.changePriorityIndex(priorityIndex);

    this.changePriorityBtnClass(
        priorityBtn, currentPriorityClass, newPriorityIndex);
  }

  getTaskText(form) {
    const data = new FormData(form);

    const taskText = data.get('task-name').trim();

    return taskText;
  }

  getEditedTaskId(form) {
    const input = form.querySelector('.task-name');
    const id = input.getAttribute('data-id');

    return id;
  }

  cleanForm(form) {
    const input = form.querySelector('.task-name');
    input.value = '';

    const btnImportance = form.querySelector('.button-importance');
    btnImportance.classList = this.model.priorityBtnDefaultClassList;
  }

  submit() {
    const form = document.querySelector('.task-form');
    const taskText = this.getTaskText(form);

    const priorityIndex = this
        .getCurrentPriorityIndex(this.getPriorityBtn(form));

    const taskId = this.getEditedTaskId(form);

    if (!taskId) {
      const task = this.createTaskInstance(
          this.model.classList[priorityIndex],
          taskText,
      );

      this.tomato.addTask(task);
      console.log('task: в Tomato ', task);
      this.setItemLocalStorage(task);
    } else {
      const importance = this.model.priorityClassList[priorityIndex];

      this.tomato.editTask(taskId, taskText, importance);
    }

    this.cleanForm(form);
  }

  isPopUpMenuBtn(target) {
    return target.classList.contains('tasks__button');
  }

  isPopUpMenu(target) {
    return target.closest('.popup');
  }

  isTaskItemElem(target) {
    return !this.isPopUpMenuBtn(target) && !this.isPopUpMenu(target);
  }

  getPopUpMenu(item) {
    return item.querySelector('.popup');
  }

  getTaskElem(target) {
    return target.closest('.tasks__item');
  }

  togglePopUpMenu(popUpMenu) {
    popUpMenu.classList.toggle('popup_active');
  }

  hidePopUpMenu(popUpMenu) {
    popUpMenu.classList.remove('popup_active');
  }

  isPopUpMenuEditBtn(target) {
    return target.classList.contains('popup__edit-button');
  }

  isPopUpMenuDelBtn(target) {
    return target.classList.contains('popup__delete-button');
  }

  showDelModal(delModalOverlay) {
    delModalOverlay.classList.add('modal-overlay_active');
  }

  hideDelModal(delModalOverlay) {
    delModalOverlay.classList.remove('modal-overlay_active');
  }

  getTaskTextBtn(item) {
    return item.querySelector('.tasks__text');
  }

  isdelModalOverlay(target, delModalOverlay) {
    return target === delModalOverlay;
  }

  isModalOverlayDelBtn(target) {
    return target.classList.contains('modal-delete__close-button');
  }

  isModalOverlayCancelBtn(target) {
    return target.classList.contains('modal-delete__cancel-button');
  }

  userWantsDelModalOverlayRemove(target, delModalOverlay) {
    return this.isdelModalOverlay(target, delModalOverlay) ||
      this.isModalOverlayDelBtn(target) ||
      this.isModalOverlayCancelBtn(target);
  }

  delModalOverlayRemove(delModalOverlay) {
    delModalOverlay.classList.remove('modal-overlay_active');
  }

  isClickedDelTaskBtn(target) {
    return target.classList.contains('modal-delete__delete-button');
  }

  delModalOverlayControl(target, delModalOverlay, taskElem) {
    if (this.userWantsDelModalOverlayRemove(target, delModalOverlay)) {
      this.delModalOverlayRemove(delModalOverlay);
    }

    if (this.isClickedDelTaskBtn(target)) {
      this.hideDelModal(delModalOverlay);
      taskElem.remove();
    }
  }

  activateElem(elem) {
    elem.disabled = false;
  }

  showElem(elem) {
    elem.classList.remove('hidden');
  }

  getTextContent(elem) {
    return elem.textContent;
  }

  getTimeValueInSeconds(textContent) {
    const splitedValue = textContent.split(':');
    const minutes = Number(splitedValue[0]);
    const seconds = Number(splitedValue[1]);
    const totalSeconds = minutes * 60 + seconds;

    return totalSeconds;
  }

  addZeroIfNeeded(num) {
    const newNum = num;

    return newNum < 10 ? `0${newNum}` : newNum;
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
    console.log('taskId: ', taskId);
    let currentTasks = this.getLocalStorageTomatoTasks();

    currentTasks = currentTasks.filter((item) => Number(item.id) !== taskId);

    localStorage.setItem('localStorage', JSON.stringify(currentTasks));
  }

  updateTaskDataInLocalStorageTomatoTask(task) {
    const currentTasks = this.getLocalStorageTomatoTasks();

    currentTasks.forEach(item => {
      if (Number(item.id) === Number(task.id)) {
        item.text = task.text;
        item.count = task.count;
      }
    });

    localStorage.setItem('localStorage', JSON.stringify(currentTasks));
  }
}
