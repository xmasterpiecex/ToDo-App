import { MockServer} from './mock-server/mock-server.js';

const tasksConteiner = document.getElementById('tasks');
const creationTitle = document.getElementById('creationTitle');
const buttonAccept = document.getElementById('accept');
const buttonPriority = document.getElementById('priority'); 

const server = new MockServer();
let tasksList = [];

// Get tasks from server
server.getTasks().then((tasksList) => init(tasksList));

//ToDo: Implement init function. Display tasks in page
function init(task) { 
  tasksList = task;
  // console.log(tasksList)
}


creationTitle.addEventListener('keyup', (e) =>
  e.keyCode === 13 || e.key === 'Enter' ? createTask() : {}
);

buttonAccept.addEventListener('click', () => createTask());

creationTitle.addEventListener('input', () => switchCreationButtonState());

function switchCreationButtonState() {
  const disabled = !creationTitle.value.length;
  buttonAccept.disabled = disabled;
  buttonPriority.disabled = disabled;
}

function createTask() {
  if (!creationTitle.value.length) return;

  const newObject = {
    title: `${creationTitle.value}`,
    id: Math.floor(Math.random() * 10000).toString(),
    priority: 'medium',
    priorityIndex:
      tasksList && tasksList.length ? tasksList[0].priorityIndex + 1 : 1,
  };

  const isDublicate = tasksList.filter(
    (task) => task.title === creationTitle.value
  ).length;

  if (isDublicate) {
    window.alert('Task is already exist');
    return;
  }

  tasksConteiner.innerHTML = '';
  tasksList.push(newObject);

  tasksList
    .sort((a, b) => b.priorityIndex - a.priorityIndex)
    .forEach(
      (task) =>
        (tasksConteiner.innerHTML += `
      <div class="card" id="${task.id}">
        <button class="action-button">
            <img src="./assets/svg/pririty.svg" alt="" class="svg" />
        </button>
        <div class="card-title">
            <span>${task.title}</span>
        </div>
        <div class="task-actions">
            <button class="action-button small">
                <img src="./assets/svg/create.svg" alt="" class="svg small-svg" />
            </button>
            <button class="action-button small" id = "up">
                <img src="./assets/svg/arrowup.svg" alt="" class="svg small-svg" />
            </button>
            <button class="action-button small" id="delete">
                <img src="./assets/svg/delete.svg" alt="" class="svg small-svg" />
            </button>
            <button class="action-button small" id = "down">
                <img
                    src="./assets/svg/arrowdown.svg"
                    alt=""
                    class="svg small-svg"
                />
            </button>
        </div>
      </div>
      `)
    );

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

      [tasksList[index], tasksList[index - 1]] = [
        tasksList[index - 1],
        tasksList[index],
      ];

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

      [tasksList[index], tasksList[index + 1]] = [
        tasksList[index + 1],
        tasksList[index],
      ];

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
