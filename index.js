import { create, switchCreationButtonState, init } from './task.js';
import { MockServer } from './mock-server/mock-server.js';
import { getDropdownTamplate } from './tamplates/task-dropdown.tamplate.js';
import { setPriority, priorityAction } from './priority-dropdown.js';

const tasksConteinerElement = document.getElementById('tasks');
const creationTitleElement = document.getElementById('creationTitle');
const buttonAcceptElement = document.getElementById('accept');
const buttonPriorityElement = document.getElementById('priority');
const server = new MockServer();

server.getTasks().then((tasksList) => init(tasksList, tasksConteinerElement));

creationTitleElement.addEventListener('keyup', (e) => {
  if (e.keyCode === 13 || e.key === 'Enter') {
    create(tasksConteinerElement, creationTitleElement, buttonPriorityElement.id.split(' ')[1]);
    switchCreationButtonState(buttonPriorityElement, buttonAcceptElement, creationTitleElement);
  }
});

buttonAcceptElement.addEventListener('click', () => {
  create(tasksConteinerElement, creationTitleElement, buttonPriorityElement.id.split(' ')[1]);
  switchCreationButtonState(buttonPriorityElement, buttonAcceptElement, creationTitleElement);
  setPriority('dropdown', buttonPriorityElement, '');
});

creationTitleElement.addEventListener('input', () =>
  switchCreationButtonState(buttonPriorityElement, buttonAcceptElement, creationTitleElement)
);

buttonPriorityElement.addEventListener('click', () => {
  const dropdown = document.querySelector('.dropdown');

  if (dropdown) {
    dropdown.remove();
    return;
  }

  buttonPriorityElement.insertAdjacentHTML('afterEnd', getDropdownTamplate());
  const dropdownForm = document.querySelector('.dropdown');

  dropdownForm.addEventListener('submit', (event) => {
    event.preventDefault();
    priorityAction(event.submitter.id, buttonPriorityElement, dropdownForm);
  });
});

document.addEventListener('click', () => {
  const dropdown = document.querySelector('.dropdown');

  if (dropdown) {
    dropdown.remove();
  }
});
