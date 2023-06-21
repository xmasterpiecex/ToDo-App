import { getTaskTamplate } from './tamplates/task.tamplate.js';
import { getDropdownTamplate } from './tamplates/task-dropdown.tamplate.js';
import { priorityAction } from './priority-dropdown.js';
import { getEditTamplate } from './tamplates/edit-window.tamplate.js';

let tasksList = [];

export function init(tasks, tasksConteinerElement) {
  tasksList = tasks;

  tasksList
    .sort((a, b) => b.priorityIndex - a.priorityIndex)
    .forEach((task) => {
      tasksConteinerElement.insertAdjacentHTML('beforeEnd', getTaskTamplate(task.id, task.title, task.priority));
      subToForm(task);
    });
}

export function create(tasksConteinerElement, creationTitleElement, priorityId) {
  if (!creationTitleElement.value.length) return;

  const newTask = {
    title: `${creationTitleElement.value}`,
    id: Math.floor(Math.random() * 10000).toString(),
    priority: priorityId ? priorityId : 'medium',
    priorityIndex: tasksList && tasksList.length ? tasksList[0].priorityIndex + 1 : 1,
  };
  const isDublicate = tasksList.filter((task) => task.title === creationTitleElement.value).length;

  if (isDublicate) {
    window.alert('Task is already exist');
    return;
  }

  tasksList.unshift(newTask);

  tasksConteinerElement.insertAdjacentHTML('afterBegin', getTaskTamplate(newTask.id, newTask.title, newTask.priority));

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

      case 'priority': {
        const dropdown = taskForm.querySelector('.dropdown');

        if (dropdown) {
          dropdown.remove();
          return;
        }

        const priorityBtn = taskForm.querySelector('#priority');

        priorityBtn.insertAdjacentHTML('afterEnd', getDropdownTamplate());
        break;
      }
      case 'edit': {
        const editBtn = taskForm.querySelector('#edit');

        editBtn.insertAdjacentHTML('afterEnd', getEditTamplate());

        const closeBtn = document.getElementById('close');
        const editWindow = document.getElementById('edit-window');

        closeBtn.addEventListener('click', () => {
          editWindow.remove();
        });
      }
      default:
        break;
    }

    const priorityBtn = taskForm.querySelector('#priority');
    const dropdown = taskForm.querySelector('.dropdown');

    priorityAction(event.submitter.id, priorityBtn, dropdown);
  });
}
