import {Tomato} from './Tomato.js';
import {ViewTomato} from './View.js';
import {TomatoModel} from './Model.js';
import {ControllerTomato} from './ControllerTomato.js';

export const init = () => {
  const tomato = new Tomato();
  const tomatoModel = new TomatoModel({});
  const controller = new ControllerTomato(tomato, tomatoModel);

  const view = new ViewTomato(tomato, document.querySelector('.task-form'),
      controller);
  view.init();
};

