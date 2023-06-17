import { MockServer } from './mock-server/mock-server.js';
import { getTaskTamplate } from './tamplates/task.tamplate.js';

const tasksConteiner = document.getElementById('tasks');
const creationTitle = document.getElementById('creationTitle');
const buttonAccept = document.getElementById('accept');
const buttonPriority = document.getElementById('priority');

const server = new MockServer();
let tasksList = [];

// Get tasks from server
server.getTasks().then((tasksList) => init(tasksList));

//ToDo: Implement init function. Display tasks in page
function init(tasks) {
  tasksList = tasks;
  tasks.sort((a, b) => b.priorityIndex - a.priorityIndex).forEach((task) => (tasksConteiner.innerHTML += getTaskTamplate(task.id, task.title)));

  subscribeToDeleteEvent();
  subscribeToUpEvent();
  subscribeToDownEvent();
}

creationTitle.addEventListener('keyup', (e) => (e.keyCode === 13 || e.key === 'Enter' ? createTask() : {}));

buttonAccept.addEventListener('click', () => createTask());

creationTitle.addEventListener('input', () => switchCreationButtonState());

function switchCreationButtonState() {
  const disabled = !creationTitle.value.length;
  buttonAccept.disabled = disabled;
  buttonPriority.disabled = disabled;
}

function createTask() {
  if (!creationTitle.value.length) return;

  const newTask = {
    title: `${creationTitle.value}`,
    id: Math.floor(Math.random() * 10000).toString(),
    priority: 'medium',
    priorityIndex: tasksList && tasksList.length ? tasksList[0].priorityIndex + 1 : 1,
  };

  const isDublicate = tasksList.filter((task) => task.title === creationTitle.value).length;

  if (isDublicate) {
    window.alert('Task is already exist');
    return;
  }

  tasksList.unshift(newTask);

  tasksConteiner.innerHTML = getTaskTamplate(newTask.id, newTask.title) + tasksConteiner.innerHTML;

  subscribeToUpEvent();

  subscribeToDownEvent();

  subscribeToDeleteEvent();

  creationTitle.value = '';
  switchCreationButtonState();
}

function subscribeToUpEvent() {
  const buttonUp = document.querySelectorAll('#up');

  buttonUp.forEach((btn) => {
    btn.addEventListener('click', () => {
      const firstNode = btn.closest('.card');
      const id = Number(firstNode.id);
      const index = tasksList.findIndex((task) => task.id == id);

      const secTask = tasksList[index - 1];
      const secNode = document.getElementById(secTask.id);

      [tasksList[index], tasksList[index - 1]] = [tasksList[index - 1], tasksList[index]];

      secNode.parentNode.insertBefore(secNode, firstNode);
      firstNode.parentNode.insertBefore(secNode, firstNode.nextSibling);
    });
  });
}

function subscribeToDownEvent() {
  const buttonDown = document.querySelectorAll('#down');

  buttonDown.forEach((btn) => {
    btn.addEventListener('click', () => {
      const firstNode = btn.closest('.card');
      const id = Number(firstNode.id);
      const index = tasksList.findIndex((task) => task.id == id);

      const secTask = tasksList[index + 1];
      const secNode = document.getElementById(secTask.id);

      [tasksList[index], tasksList[index + 1]] = [tasksList[index + 1], tasksList[index]];

      firstNode.parentNode.insertBefore(firstNode, secNode);
      secNode.parentNode.insertBefore(firstNode, secNode.nextSibling);
    });
  });
}

function subscribeToDeleteEvent() {
  const buttonDelete = document.querySelectorAll('#delete');

  buttonDelete.forEach((btn) => {
    btn.addEventListener('click', () => {
      const perentNode = btn.closest('.card');
      const id = Number(perentNode.id);
      const index = tasksList.findIndex((task) => task.id == id);

      tasksList.splice(index, 1);
      perentNode.remove();
    });
  });
}
