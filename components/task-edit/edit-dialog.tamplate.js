export function getEditTamplate(task) {
  return `<div class="edit-window-container" id="edit-window">
      <div class="edit-dialog">
        <div class="edit-dialog-header">
          <div class="edit-header-label">
            <img src="./assets/svg/create.svg" class="svg" alt="" />

          </div>
          <button class="action-button" id="close"><img src="./assets/svg/close.svg" class="svg" alt="" /></button>
        </div>
        <form class="edit-content">
          <div class="card edit-card">
            <button class="action-button" id="edit-priority" type="submit" onclick="event.cancelBubble = true;">
              <img src="./assets/svg/priority-${task.priority}.svg" alt="" class="svg" />
            </button>
            <div class="edit-card-title">
              <input type="text" class="creation-card-input" placeholder="" id="creationTitle" value="${task.title}"/>
            </div>
          </div>
          <textarea
            name="description"
            id="description"
            class="edit-description"
            placeholder="Add description"
          >${task.description}</textarea>
          <button class="action-button" id="accept" type="submit">
            <img src="./assets/svg/done.svg" alt="" class="svg" />
          </button>
        </form>
      </div>
    </div>`;
}
