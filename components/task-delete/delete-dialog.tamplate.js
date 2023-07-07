export function getDeleteTamplate() {
  return `<div class="delete-dialog-window" id="delete-window">
    <div class="delete-dialog">
      <div class="delete-content">
        <span>Are you sure about that?</span>
        <div class="delete-action">
          <button class="action-button" id="delete-yes" >
            <img src="./assets/svg/done.svg" alt="" class="svg" />
          </button>
          <button class="action-button" id="delete-no" >
            <img src="./assets/svg/close.svg" alt="" class="svg" />
          </button>
        </div>
      </div>
    </div>
  </div>`;
}
