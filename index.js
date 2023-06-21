import { MockServer } from './mock-server/mock-server.js';
import { initTaskCreation } from './components/task-creation/task-creation.js';
import { initTaskList } from './components/task/task.js';

const tasksConteinerElement = document.getElementById('tasks');
const server = new MockServer();

server.getTasks().then((tasksList) => initTaskList(tasksList, tasksConteinerElement));

initTaskCreation();

document.addEventListener('click', () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach((item) => {
    if (item) {
      item.remove();
    }
  });
});
