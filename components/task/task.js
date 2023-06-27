import { getTaskTamplate } from './task.tamplate.js';
import { getDropdownTamplate } from '../task-dropdown/task-dropdown.tamplate.js';
import { priorityAction, setPriority } from '../task-dropdown/task-dropdown.js';
import { getEditTamplate } from '../task-edit/edit-dialog.tamplate.js';

let tasksList = [];

export function initTaskList(tasks, tasksConteinerElement) {
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
    description: '',
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
      case 'edit': {
        const editBtn = document.querySelector('.bord-title');

        editBtn.insertAdjacentHTML('afterEnd', getEditTamplate(task));

        const closeBtn = document.getElementById('close');
        const editWindow = document.getElementById('edit-window');

        closeBtn.addEventListener('click', () => {
          editWindow.remove();
        });

        subToEditDialog({ ...task }, editWindow);

        break;
      }

      case 'priority': {
        const dropdowns = document.querySelectorAll('.dropdown');

        for (const item of dropdowns) {
          if (item) {
            item.remove();
            return;
          }
        }

        event.submitter.insertAdjacentHTML('afterEnd', getDropdownTamplate());
        break;
      }
      default:
        break;
    }
    const priorityBtn = taskForm.querySelector('#priority');
    const dropdown = taskForm.querySelector('.dropdown');

    priorityAction(event.submitter.id, priorityBtn, dropdown, task);
  });
}

function subToEditDialog(task, dialog) {
  const editForm = document.querySelector('.edit-content');

  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    switch (event.submitter.id) {
      case 'accept': {
        const titleElement = editForm.querySelector('#creationTitle');
        const descriptionElement = editForm.querySelector('#description');

        task.description = descriptionElement.value;
        task.title = titleElement.value;

        update(task);
        dialog.remove();
        break;
      }
      case 'edit-priority':
        const dropdowns = editForm.querySelectorAll('.dropdown');

        for (const item of dropdowns) {
          if (item) {
            item.remove();
            return;
          }
        }

        event.submitter.insertAdjacentHTML('afterEnd', getDropdownTamplate());
        break;

      default:
        break;
    }
    const priorityBtn = editForm.querySelector('#edit-priority');
    const dropdown = editForm.querySelector('.dropdown');

    priorityAction(event.submitter.id, priorityBtn, dropdown, task);
  });
}

function update(task) {
  const taskToEdit = tasksList.find((item) => item.id === task.id);

  for (let key in task) {
    taskToEdit[key] = task[key];
  }

  const form = document.getElementById(task.id);
  const titleElement = form.querySelector('.card-title span');
  const priorityBtn = form.querySelector('#priority');

  titleElement.innerHTML = task.title;

  setPriority('priority-' + task.priority, priorityBtn, task.priority);
}
