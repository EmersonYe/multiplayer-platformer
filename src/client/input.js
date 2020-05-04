import { sendInput } from './networking';

function onKeyDown(event) {
  const movement = {
    up: false,
    down: false,
    left: false,
    right: false,
  };
  switch (event.keyCode) {
    case 65: // A
    case 37: // left arrow
      movement.left = true;
      break;
    case 87: // W
    case 38: // up arrow
      movement.up = true;
      break;
    case 68: // D
    case 39: // right arrow
      movement.right = true;
      break;
    case 83: // S
    case 40: // down arrow
      movement.down = true;
      break;
    default:
      // Ignore non-directional keyboard input.
  }
  sendInput(movement);
}

function onKeyUp(event) {
  const movement = {
    up: false,
    down: false,
    left: false,
    right: false,
  };
  switch (event.keyCode) {
    case 65: // A
    case 37: // left arrow
      movement.left = false;
      break;
    case 87: // W
    case 38: // up arrow
      movement.up = false;
      break;
    case 68: // D
    case 39: // right arrow
      movement.right = false;
      break;
    case 83: // S
    case 40: // down arrow
      movement.down = false;
      break;
    default:
      // Ignore non-directional keyboard input.
  }
  sendInput(movement);
}

export function startCapturingInput() {
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
}

export function stopCapturingInput() {
  window.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('keyup', onKeyUp);
}
