import { create, switchCreationButtonState, init } from './task.js';
import { MockServer } from './mock-server/mock-server.js';

const tasksConteinerElement = document.getElementById('tasks');
const creationTitleElement = document.getElementById('creationTitle');
const buttonAcceptElement = document.getElementById('accept');
const buttonPriorityElement = document.getElementById('priority');
const server = new MockServer();

server.getTasks().then((tasksList) => init(tasksList, tasksConteinerElement));

creationTitleElement.addEventListener('keyup', (e) => {
  if (e.keyCode === 13 || e.key === 'Enter') {
    create(tasksConteinerElement, creationTitleElement);
    switchCreationButtonState(buttonPriorityElement, buttonAcceptElement, creationTitleElement);
  }
});

buttonAcceptElement.addEventListener('click', () => {
  create(tasksConteinerElement, creationTitleElement);
  switchCreationButtonState(buttonPriorityElement, buttonAcceptElement, creationTitleElement);
});

creationTitleElement.addEventListener('input', () =>
  switchCreationButtonState(buttonPriorityElement, buttonAcceptElement, creationTitleElement)
);
