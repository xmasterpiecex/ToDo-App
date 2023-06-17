export function getTaskTamplate(id, title) {
  return `<form class="card" id="${id}">
    <button class="action-button" id="priority" type="submit">
        <img src="./assets/svg/pririty.svg" alt="" class="svg" />
    </button>
    <div class="card-title">
        <span>${title}</span>
    </div>
    <div class="task-actions">
        <button class="action-button small" id="edit" type="submit">
            <img src="./assets/svg/create.svg" alt="" class="svg small-svg" />
        </button>
        <button class="action-button small" id="up" type="submit">
            <img src="./assets/svg/arrowup.svg" alt="" class="svg small-svg" />
        </button>
        <button class="action-button small" id="delete" type="submit">
            <img src="./assets/svg/delete.svg" alt="" class="svg small-svg" />
        </button>
        <button class="action-button small" id="down" type="submit">
            <img
                src="./assets/svg/arrowdown.svg"
                alt=""
                class="svg small-svg"
            />
        </button>
    </div>
  </form>
  `;
}
