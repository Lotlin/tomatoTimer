import {Task} from './Task.js';

export const init = () => {
  const myTask = new Task('Тестовая задача');

  console.log('myTask: ', myTask);

  myTask.id = '123';
  myTask.title = 'Новая задача';
  myTask.counter = 1;
  console.log('myTask: ', myTask);

  myTask.increaseCounter();
  myTask.changeTitle('Новая задача');
  console.log('myTask: ', myTask);

  /* let count = 0;

  const imp = ['default', 'important', 'so-so'];
  document
      .querySelector('.button-importance')
      .addEventListener('click', ({target}) => {
        count += 1;
        if (count >= imp.length) {
          count = 0;
        }

        for (let i = 0; i < imp.length; i++) {
          if (count === i) {
            target.classList.add(imp[i]);
          } else {
            target.classList.remove(imp[i]);
          }
        }
      });
  */
};

