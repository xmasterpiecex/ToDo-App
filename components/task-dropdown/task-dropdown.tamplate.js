export function getDropdownTamplate() {
  return `<div class="dropdown" id="dropdown">
    <button class="menu-item action-button" id="high" value="high" type="submit" onclick="event.cancelBubble = true;"><img src="./assets/svg/priority-high.svg" alt="" class="svg" /></button>
    <button class="menu-item action-button" id="medium" value="medium" type="submit" onclick="event.cancelBubble = true;"><img src="./assets/svg/priority-medium.svg" alt="" class="svg" /></button>
    <button class="menu-item action-button" id="low" value="low" type="submit" onclick="event.cancelBubble = true;"><img src="./assets/svg/priority-low.svg" alt="" class="svg" /></button>
    <button class="menu-item action-button" id="urgent" value="urgent" type="submit" onclick="event.cancelBubble = true;"><img src="./assets/svg/priority-urgent.svg" alt="" class="svg" /></button>
  </div>
    `;
}
