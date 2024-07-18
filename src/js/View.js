import {
  RenderTomatoFormElems, RenderTomatoList, RenderActiveWindow,
  RenderTimerTextContent,
  RenderTextContent,
} from './RenderTomato.js';

/* eslint-disable require-jsdoc */
export class ViewTomato {
  constructor(tomato, parentELem, controller) {
    this.tomato = tomato;
    this.parentELem = parentELem;
    this.controller = controller;
    this.addTaskFrom = new RenderTomatoFormElems(parentELem).render();
    this.mainElem = document.querySelector('.main__container');
    this.activeTaskWindowElem = this.mainElem.querySelector('.window__panel');
    this.taskListElem = this.mainElem.querySelector('.tasks');
    this.delModalOverlay = document.querySelector('.modal-overlay');
    this.form = this.mainElem.querySelector('.task-form');
    this.timerCounterElem = this.mainElem.querySelector('.window__timer-text');
    this.timerStartBtn = this.mainElem.querySelector('.button-start');
    this.timerStopBtn = this.mainElem.querySelector('.button-stop');
    this.bindListeners();
  }

  init() {
    const tasksLS = this.tomato.getLocalStorageTomatoTasks();
    const restoredTasksList = [];

    if (tasksLS.length) {
      tasksLS.forEach(task => {
        const restoredTask = this.controller.restoreTaskInstance(task);
        restoredTasksList.push(restoredTask);
      });
    }

    this.tomato.tasks = restoredTasksList;
    new RenderTomatoList(this.taskListElem, this.tomato.tasks).render();
  }

  bindListeners() {
    const priorityBtn = this.controller.getPriorityBtn(this.form);
    let activeTask = NaN;

    priorityBtn.addEventListener('click', () => {
      this.controller.changePriorityBtnColor(priorityBtn);
    });

    this.parentELem.addEventListener('submit', (e) => {
      e.preventDefault();

      this.controller.submit();

      new RenderTomatoList(this.taskListElem, this.tomato.tasks).render();
      new RenderTomatoFormElems(this.form).render();
    });

    this.taskListElem.addEventListener('click', ({target}) => {
      const taskElem = this.controller.getTaskElem(target);
      const taskId = taskElem.getAttribute('data-id');

      if (this.controller.isPopUpMenuBtn(target)) {
        const popUpMenu = this.controller.getPopUpMenu(taskElem);
        this.controller.togglePopUpMenu(popUpMenu);
        popUpMenu.addEventListener('click', ({target}) => {
          if (this.controller.isPopUpMenuEditBtn(target)) {
            this.tomato.stopTimer();

            const editedTask = this.tomato.getTaskById(taskId);
            new RenderTomatoFormElems(this.form, editedTask).render('isEdit');
            const newPriorityBtn = this.controller.getPriorityBtn(this.form);

            const taskTextElem = taskElem.querySelector('.tasks__text');
            const text = 'Отредактируйте задачу в форме добавления задачи';
            new RenderTextContent(taskTextElem, text).render();

            newPriorityBtn.addEventListener('click', () => {
              this.controller.changePriorityBtnColor(newPriorityBtn);
            });

            this.controller.hidePopUpMenu(popUpMenu);
          }

          if (this.controller.isPopUpMenuDelBtn(target)) {
            this.controller.showDelModal(this.delModalOverlay);
            this.tomato.delTask(taskId);
            this.tomato.removeTaskFromLocalStorageTomatoTasks(taskId);
            new RenderTomatoFormElems(this.form).render();
          }
        });

        this.delModalOverlay.addEventListener('click', ({target}) => {
          this.controller.delModalOverlayControl(
              target,
              this.delModalOverlay,
              taskElem,
          );
        });
      }

      if (this.controller.isTaskItemElem(target)) {
        activeTask = this.tomato.setActiveTask(taskId);

        if (activeTask) {
          new RenderActiveWindow(this.activeTaskWindowElem, activeTask)
              .render();
          new RenderTimerTextContent(
              this.timerCounterElem,
              this.tomato.workTime,
          ).render();
          this.controller.activateElem(this.timerStartBtn);
        }
      }
    });

    this.timerStartBtn.addEventListener('click', () => {
      if (this.tomato.state.state === 'stop') {
        this.controller.showElem(this.timerStopBtn);

        this.tomato.startTimer(activeTask, this.timerCounterElem);
      }

      this.timerStopBtn.addEventListener('click', () => {
        this.tomato.stopTimer();
      });
    });
  }
}

