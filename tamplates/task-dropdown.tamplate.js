export function getDropdownTamplate() {
  return `<div class="dropdown" id="dropdown">
    <button class="menu-item" id="high" type="submit" onclick="event.cancelBubble = true;"><img src="./assets/svg/priority-high.svg" alt="" class="svg" /></button>
    <button class="menu-item" id="medium" type="submit" onclick="event.cancelBubble = true;"><img src="./assets/svg/priority-medium.svg" alt="" class="svg" /></button>
    <button class="menu-item" id="low" type="submit" onclick="event.cancelBubble = true;"><img src="./assets/svg/priority-low.svg" alt="" class="svg" /></button>
    <button class="menu-item" id="urgent" type="submit" onclick="event.cancelBubble = true;"><img src="./assets/svg/priority-urgent.svg" alt="" class="svg" /></button>
  </div>
    `;
}
