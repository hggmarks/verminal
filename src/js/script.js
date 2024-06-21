import { TerminalBuffer } from "./terminal.js";

const sizeX = 80;
const sizeY = 25;

const terminal = new TerminalBuffer('.grid-container', sizeX, sizeY);

const acceptedMoves = {
  ArrowLeft() {
    terminal.cursor.moveCol(-1);
  },
  ArrowRight() {
    terminal.cursor.moveCol(1);
  },
  ArrowUp() {
    terminal.cursor.moveRow(-1);
  },
  ArrowDown() {
    terminal.cursor.moveRow(1);
  },
  Backspace() {
    terminal.clearPreviousCell();
    if (terminal.cursor.position.x == 0 && terminal.cursor.position.y > 0) {
      terminal.cursor.moveRow(-1);
      terminal.cursor.position.x = sizeX - 1;
    } else {
      terminal.cursor.moveCol(-1);
    }
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key in acceptedMoves) {
    terminal.unhighlightCell();
    acceptedMoves[event.key]();
    terminal.highlightCell();
  } else if (event.key.length === 1) {
    terminal.setCurrentCellCharacter(event.key);
    terminal.unhighlightCell();
    if (terminal.cursor.position.x == 79) {
      terminal.cursor.carriageReturn();
      terminal.cursor.lineFeed();
    } else {
      terminal.cursor.moveCol(1);
    }
    terminal.highlightCell();
  }
  console.log(event.key)
});


// #837fdb



