import {Task} from './Task.js';
import {Tomato} from './Tomato.js';

export const init = () => {
  const myTask = new Task('Тестовая задача');

  const tomato = new Tomato();

  tomato.runTaskTimer(myTask);
};

