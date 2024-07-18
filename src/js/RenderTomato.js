import {el, mount, setChildren} from 'redom';

/* eslint-disable require-jsdoc */
export class RenderTomato {
  constructor(parentElem) {
    this.parentElem = parentElem;

    if (!this.parentElem) {
      throw new Error(`Элемент для добавления верстки не найдет на странице`);
    }
  }
}

export class RenderTomatoFormElems extends RenderTomato {
  constructor(parentElem, task = {}) {
    super(parentElem);
    this.task = task;
    this.taskText = task.text ? task.text : '';
    this.taskImportance = task.importance ? task.importance : 'default';
    this.taskId = task.id ? task.id : '';
  }

  render(isEdit = false) {
    const input = el('input', {
      'class': `task-name input-primary`,
      'type': 'text',
      'name': 'task-name',
      'id': 'task-name',
      'value': this.taskText,
      'placeholder': 'название задачи',
      'data-id': this.taskId,
      'required': true,
    });

    const importanceBtn = el('button', {
      class: `button button-importance ${this.taskImportance}`,
      type: 'button',
      ariaLabel: 'Указать важность',
    });

    const submitBtn = el('button', {
      class: 'button button-primary task-form__add-button',
      type: 'submit',
      textContent: isEdit ? 'Изменить' : 'Сохранить',
    });

    setChildren(this.parentElem, [input, importanceBtn, submitBtn]);
  }
}

export class RenderActiveWindow extends RenderTomato {
  constructor(parentElem, task = {}) {
    super(parentElem);
    this.task = task;
    this.taskText = task.text ? task.text : 'Не выбрана активная задача';
    this.taskCount = 0;
  }

  render() {
    const titieElem = el('p', {
      class: 'window__panel-title',
      textContent: this.taskText,
    });

    const countELem = el('p', {
      class: 'window__panel-task-text',
      textContent: `Томат ${this.taskCount}`,
    });

    setChildren(this.parentElem, [titieElem, countELem]);
  }
}

export class RenderTomatoList extends RenderTomato {
  constructor(parentElem, tasks = {}) {
    super(parentElem);
    this.tasks = tasks;
  }

  renderPopUpMenu() {
    const menuWrap = el('div', {class: `popup`});
    const editBtn = el(
        'button', {class: `popup__button popup__edit-button`}, 'Редактировать',
    );
    const delBtn = el(
        'button', {class: `popup__button popup__delete-button`}, 'Удалить',
    );

    setChildren(menuWrap, [editBtn, delBtn]);

    return menuWrap;
  }

  renderItem(task) {
    const li = el('li', {
      'class': `tasks__item ${task.importance}`,
      'data-id': task.id,
      'data-importance': task.importance,
    });
    const span = el('span', {class: 'count-number'}, task.count);
    const btnTask = el('button', {class: 'tasks__text'}, task.text);
    const btnMenu = el('button', {class: 'tasks__button'});
    const popUpMenu = this.renderPopUpMenu();

    setChildren(li, [span, btnTask, btnMenu, popUpMenu]);
    mount(this.parentElem, li);
  }

  render() {
    this.parentElem.textContent = '';

    Object.values(this.tasks).forEach(task => {
      this.renderItem(task);
    });
  }
}

export class RenderTimerTextContent extends RenderTomato {
  constructor(parentElem, time = 25) {
    super(parentElem);
    this.timeInSeconds = time * 60;
  }

  render() {
    if (this.timeInSeconds < 60) {
      this.parentElem.textContent = `00:${this.timeInSeconds}`;
    } else {
      this.parentElem.textContent = `${this.timeInSeconds}:00`;
    }
  }
}

export class RenderTextContent extends RenderTomato {
  constructor(parentElem, text) {
    super(parentElem);
    this.text = text;
  }

  render() {
    this.parentElem.textContent = this.text;
  }
}
