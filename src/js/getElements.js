export const taskForm = document.querySelector('.task-form');
export const getTaskFormInput = () => taskForm.querySelector('.task-name');
export const priorityBtn = taskForm.querySelector('.button-importance');
export const getPrioirityBtn = () =>
  taskForm.querySelector('.button-importance');
export const taskListElem = document.querySelector('.tasks__list');
export const getAllTaskItemsElem = () =>
  taskListElem.querySelectorAll('.tasks__item');
export const getTaskTextBtn = (item) => item.querySelector('.tasks__text');
export const getTaskCountElem = (item) => item.querySelector('.count-number');
export const getPopUpMenu = (item) => item.querySelector('.popup');
export const delModalOverlay = document.querySelector('.modal-overlay');
export const pomodoroWindow = document.querySelector('.window');
export const getTomatoWindowTaskTitle = () =>
  pomodoroWindow.querySelector('.window__panel-title');
export const getTomatoWindowTaskTomatoCount = () =>
  pomodoroWindow.querySelector('.window__panel-task-text');
