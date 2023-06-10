const tasks = [
  {
    id: '2FEjJKDVCVCMSWEe4691',
    title: 'Feed dragons',
    pririty: 'High',
    priorityIndex: 2,
  },
  {
    id: '1FEjJKDVCVCMSWEe4691',
    title: 'Give dragons water',
    pririty: 'High',
    priorityIndex: 1,
  },
  {
    id: '3FEjJKDVCVCMSWEe4691',
    title: 'Buy some food for tommorow',
    pririty: 'High',
    priorityIndex: 3,
  },
  {
    id: '4FEjJKDVCVCMSWEe4691',
    title: 'Gym',
    pririty: 'Middle',
    priorityIndex: 4,
  },
  {
    id: '1FEjJKDV5VCMSWEe4691',
    title: 'Read 2 page of new book',
    pririty: 'Middle',
    priorityIndex: 5,
  },
  {
    id: '1FEjJKDVCVCMSWE64691',
    title: 'Take a nap',
    pririty: 'Middle',
    priorityIndex: 6,
  },
  {
    id: '1FEjJ7DVCVCMSWEe4691',
    title: 'Relax',
    pririty: 'Low',
    priorityIndex: 7,
  },
  {
    id: '1FEjJK8VCVCMSWEe4691',
    title: 'Focus',
    pririty: 'Low',
    priorityIndex: 8,
  },
  {
    id: '9FEjJKDVCVCMSWEe4691',
    title: 'Make something',
    pririty: 'Low',
    priorityIndex: 9,
  },
];

const tasksConteiner = document.getElementById('tasks');

tasks
  .sort((a, b) => a.priorityIndex - b.priorityIndex)
  .forEach(
    (task) =>
      (tasksConteiner.innerHTML += `
      <div class="card">
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
            <button class="action-button small">
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
