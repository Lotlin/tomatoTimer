import {
  RenderTomatoFormElems, RenderTomatoList, RenderActiveWindow,
  RenderTimerTextContent,
} from '../RenderTomato.js';

/* eslint-disable require-jsdoc */
export class View {
  constructor(tomato, parentELem) {
    this.tomato = tomato;
    this.parentELem = parentELem;
  }
}

// toDo переименовать

export class TaskFormView extends View {
  // toDO улучшить querySelector (document 1 раз)
  constructor(tomato, parentELem, controller) {
    super(tomato, parentELem);
    this.controller = controller;
    this.addTaskFrom = new RenderTomatoFormElems(parentELem).render();
    this.activeTaskWindowElem = document.querySelector('.window__panel');
    this.taskListElem = document.querySelector('.tasks');
    this.delModalOverlay = document.querySelector('.modal-overlay');
    this.form = document.querySelector('.task-form');
    this.timerCounterElem = document.querySelector('.window__timer-text');
    this.timerStartBtn = document.querySelector('.button-start');
    this.timerStopBtn = document.querySelector('.button-stop');
    this.bindListeners();
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
    });

    this.taskListElem.addEventListener('click', ({target}) => {
      const taskElem = this.controller.getTaskElem(target);
      const taskId = taskElem.getAttribute('data-id');

      if (this.controller.isPopUpMenuBtn(target)) {
        const popUpMenu = this.controller.getPopUpMenu(taskElem);
        this.controller.togglePopUpMenu(popUpMenu);
        popUpMenu.addEventListener('click', ({target}) => {
          if (this.controller.isPopUpMenuEditBtn(target)) {
            const editedTask = this.tomato.getTaskById(taskId);
            new RenderTomatoFormElems(this.form, editedTask).render('isEdit');
            const newPriorityBtn = this.controller.getPriorityBtn(this.form);

            newPriorityBtn.addEventListener('click', () => {
              this.controller.changePriorityBtnColor(newPriorityBtn);
            });

            this.controller.hidePopUpMenu(popUpMenu);
          }

          if (this.controller.isPopUpMenuDelBtn(target)) {
            this.controller.showDelModal(this.delModalOverlay);
            this.tomato.delTask(taskId);
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
          new RenderActiveWindow(this.activeTaskWindowElem, activeTask).render();
          new RenderTimerTextContent(
              this.timerCounterElem,
              this.tomato.workTime,
          ).render();
          this.controller.activateElem(this.timerStartBtn);
        }
      }
    });

    this.timerStartBtn.addEventListener('click', () => {
      this.controller.showElem(this.timerStopBtn);

      this.tomato.startTimer(activeTask, this.timerCounterElem);

      this.timerStopBtn.addEventListener('click', () => {
        this.tomato.stopTimer();
      });
    });
  }
}

