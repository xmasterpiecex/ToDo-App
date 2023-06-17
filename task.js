import { getTaskTamplate } from './tamplates/task.tamplate.js';

let tasksList = [];

//ToDo: Implement init function. Display tasks in page
export function init(tasks, tasksConteinerElement) {
  tasksList = tasks;
  tasks
    .sort((a, b) => b.priorityIndex - a.priorityIndex)
    .forEach((task) => (tasksConteinerElement.innerHTML += getTaskTamplate(task.id, task.title)));

  subscribeToDeleteEvent();
  subscribeToUpEvent();
  subscribeToDownEvent();
}

export function create(tasksConteinerElement, creationTitleElement) {
  if (!creationTitleElement.value.length) return;

  const newTask = {
    title: `${creationTitleElement.value}`,
    id: Math.floor(Math.random() * 10000).toString(),
    priority: 'medium',
    priorityIndex: tasksList && tasksList.length ? tasksList[0].priorityIndex + 1 : 1,
  };

  const isDublicate = tasksList.filter((task) => task.title === creationTitleElement.value).length;

  if (isDublicate) {
    window.alert('Task is already exist');
    return;
  }

  tasksList.unshift(newTask);

  tasksConteinerElement.innerHTML = getTaskTamplate(newTask.id, newTask.title) + tasksConteinerElement.innerHTML;

  subscribeToUpEvent();
  subscribeToDownEvent();
  subscribeToDeleteEvent();
  creationTitleElement.value = '';
}

export function switchCreationButtonState(buttonPriorityElement, buttonAcceptElement, creationTitleElement) {
  const disabled = !creationTitleElement.value.length;
  buttonAcceptElement.disabled = disabled;
  buttonPriorityElement.disabled = disabled;
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
