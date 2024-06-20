import { TerminalBuffer } from "./terminal.js";

const sizeX = 70;
const sizeY = 20;

const terminal = new TerminalBuffer('.grid-container', sizeX, sizeY);

const acceptedMoves = {
  ArrowLeft() {
    terminal.cursor.moveRow(-1);
    return true;
  },
  ArrowRight() {
    terminal.cursor.moveRow(1);
    return true;
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key in acceptedMoves) {
    terminal.unhighlightCell();
    acceptedMoves[event.key]();
    terminal.highlightCell();
  }
});


// #837fdb



