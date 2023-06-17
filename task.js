import { getTaskTamplate } from './tamplates/task.tamplate.js';

let tasksList = [];

export function init(tasks, tasksConteinerElement) {
  tasksList = tasks;

  tasksList
    .sort((a, b) => b.priorityIndex - a.priorityIndex)
    .forEach((task) => {
      tasksConteinerElement.insertAdjacentHTML('beforeEnd', getTaskTamplate(task.id, task.title));
      subToForm(task);
    });
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

  tasksConteinerElement.insertAdjacentHTML('afterBegin', getTaskTamplate(newTask.id, newTask.title));

  subToForm(newTask);
  creationTitleElement.value = '';
}

export function switchCreationButtonState(buttonPriorityElement, buttonAcceptElement, creationTitleElement) {
  const disabled = !creationTitleElement.value.length;
  buttonAcceptElement.disabled = disabled;
  buttonPriorityElement.disabled = disabled;
}

function subToForm(task) {
  const taskForm = document.getElementById(task.id);

  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    switch (event.submitter.id) {
      case 'delete': {
        const id = Number(taskForm.id);
        const index = tasksList.findIndex((task) => task.id == id);

        tasksList.splice(index, 1);
        taskForm.remove();
        break;
      }

      case 'up': {
        const id = Number(taskForm.id);
        const index = tasksList.findIndex((task) => task.id == id);

        const secTask = tasksList[index - 1];
        const secNode = document.getElementById(secTask.id);

        [tasksList[index], tasksList[index - 1]] = [tasksList[index - 1], tasksList[index]];

        secNode.parentNode.insertBefore(secNode, taskForm);
        taskForm.parentNode.insertBefore(secNode, taskForm.nextSibling);
        break;
      }

      case 'down': {
        const id = Number(taskForm.id);
        const index = tasksList.findIndex((task) => task.id == id);

        const secTask = tasksList[index + 1];
        const secNode = document.getElementById(secTask.id);

        [tasksList[index], tasksList[index + 1]] = [tasksList[index + 1], tasksList[index]];

        taskForm.parentNode.insertBefore(taskForm, secNode);
        secNode.parentNode.insertBefore(taskForm, secNode.nextSibling);
        break;
      }

      default:
        break;
    }
  });
}
