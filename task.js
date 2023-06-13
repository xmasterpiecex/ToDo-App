const tasksConteiner = document.getElementById('tasks');
const creationTitle = document.getElementById('creationTitle');
const buttonAccept = document.getElementById('accept');
const buttonPriority = document.getElementById('priority');

const tasksList = [];

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
            <button class="action-button small">
                <img src="./assets/svg/arrowup.svg" alt="" class="svg small-svg" />
            </button>
            <button class="action-button small" id="delete">
                <img src="./assets/svg/delete.svg" alt="" class="svg small-svg" />
            </button>
            <button class="action-button small">
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

  deleteTask();

  creationTitle.value = '';
  switchCreationButtonState();
  console.log(tasksList);
}

function deleteTask() {
  const buttonDelete = document.querySelectorAll('#delete');

  buttonDelete.forEach((btn) => {
    btn.addEventListener('click', () => {
      const perentNode = btn.closest('.card');
      const id = Number(perentNode.id);
      const index = tasksList.findIndex((task) => task.id == id);
      tasksList.splice(index, 1);
      perentNode.remove();
      console.log(tasksList, index, id);
    });
  });
}
