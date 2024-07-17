/* eslint-disable require-jsdoc */
export class Controller {
  constructor(tomato, model) {
    this.tomato = tomato;
    this.model = model;
  }
}

export class TaskFormController extends Controller {
  constructor(tomato, TaskModel) {
    super(tomato, TaskModel);
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

  createTaskInstance(TaskClass, taskText) {
    return new TaskClass(taskText);
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

  // toDO переименовать
  timerInit(elem) {
    const timerTextContent = this.getTextContent(elem);
    let currentValueInSeconds = this.getTimeValueInSeconds(timerTextContent);

    const updateTimer = () => {
      currentValueInSeconds--;
      const minutes =
        this.addZeroIfNeeded(Math.floor(currentValueInSeconds / 60));
      const seconds = this.addZeroIfNeeded(currentValueInSeconds % 60);
      elem.textContent = `${minutes}:${seconds}`;
    };

    const timerInterval = setInterval(updateTimer, 1000);
  }
}
