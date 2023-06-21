export function getEditTamplate() {
  return `<div class="edit-window-conainer" id="edit-window">
    <div class="edit-dialog">
      <div class="edit-dialog-header">
        <div class="edit-header-label">
          <img src="./assets/svg/create.svg" class="svg" alt="" />
          <span> Edit </span>
        </div>
        <button class="action-button" id="close"><img src="./assets/svg/close.svg" class="svg" alt="" /></button>
      </div>
      <div class="edit-content-container">
        <div class="card edit-card">
          <button class="action-button" id="priority" onclick="event.cancelBubble = true;">
            <img src="./assets/svg/dropdown.svg" alt="" class="svg" />
          </button>
          <div class="edit-card-title">
            <input type="text" class="creation-card-input" placeholder="Add new task" id="creationTitle" />
          </div>
        </div>
        <textarea
          name="description"
          id="description"
          cols="3"
          rows="2"
          class="edit-description"
          placeholder="Add description"
        ></textarea>
        <button class="action-button" id="accept">
          <img src="./assets/svg/done.svg" alt="" class="svg" />
        </button>
      </div>
    </div>
  </div>`;
}
