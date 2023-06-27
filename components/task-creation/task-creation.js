import { create, switchCreationButtonState } from '../task/task.js';
import { getDropdownTamplate } from '../task-dropdown/task-dropdown.tamplate.js';
import { setPriority, priorityAction } from '../task-dropdown/task-dropdown.js';

const tasksConteinerElement = document.getElementById('tasks');
const creationTitleElement = document.getElementById('creationTitle');
const buttonAcceptElement = document.getElementById('accept');
const buttonPriorityElement = document.getElementById('priority');
const creationFormElement = document.getElementById('creation');

export function initTaskCreation() {
  subToCreationInput();
  subToFormChanges();
}

function subToCreationInput() {
  creationTitleElement.addEventListener('input', () =>
    switchCreationButtonState(buttonPriorityElement, buttonAcceptElement, creationTitleElement)
  );
}

function subToFormChanges() {
  creationFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    switch (event.submitter.id) {
      case 'priority': {
        const dropdown = document.querySelector('.dropdown');

        if (dropdown) {
          dropdown.remove();
          return;
        }

        event.submitter.insertAdjacentHTML('afterEnd', getDropdownTamplate());
        const dropdownForm = document.querySelector('.dropdown');

        dropdownForm.addEventListener('submit', (event) => {
          event.preventDefault();

          priorityAction(event.submitter.id, buttonPriorityElement, dropdownForm, { priority: '' });
        });
        break;
      }

      case 'accept':
        create(tasksConteinerElement, creationTitleElement, buttonPriorityElement.getAttribute('value'));
        switchCreationButtonState(buttonPriorityElement, buttonAcceptElement, creationTitleElement);
        setPriority('dropdown', buttonPriorityElement, '');
        break;

      default:
        break;
    }
    const priorityBtn = creationFormElement.querySelector('#priority');
    const dropdown = creationFormElement.querySelector('.dropdown');

    priorityAction(event.submitter.id, priorityBtn, dropdown, { priority: '' });
  });
}
