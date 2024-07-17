import {Tomato} from './Tomato.js';
import {Task, ImportantTask, SoSoTask, DefaultTask} from './Task.js';
import {RenderTomato} from './RenderTomato.js';
import {TaskFormView} from './view/View.js';
import {TaskModel} from './model/Model.js';
import {TaskFormController} from './controller/Controller.js';

/*
export const init = () => {
  const myTask = new Task('Тестовая задача');
  console.log('myTask: ', myTask);
  const hightTask = new ImportantTask('Важная задача');
  console.log('hightTask: ', hightTask);
  // const regularTask = new MiddlingTask('Средняя задача');
  console.log('regularTask: ', regularTask);
  const lowImportantTask = new DefaultTask('Обычная задача');
  console.log('lowImportantTask: ', lowImportantTask);

  const tomato = new Tomato();
  console.log('tomato: ', tomato);

  mainListener();
};
*/

export const init = () => {
  const tomato = new Tomato();
  const taskModel = new TaskModel({});
  const taskFormController = new TaskFormController(tomato, taskModel);
  const view = new TaskFormView(tomato, document.querySelector('.task-form'),
      taskFormController);
  // toDO хранение в LS, чтобы при обновлении страницы не пропадали задачи

  // ToDO вопрос, зачем 3 вида важности задачи, если их потом можно и нужно менять?

  // toDO баг при нажать "редактировать" popUpMenu и если потом удалить задачу и нажать "изменить" - получаю ошибку
};

