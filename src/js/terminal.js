import { Cursor } from "./cursor.js";

export class TerminalBuffer {
  constructor(containerSelector, sizeX, sizeY) {
    this.container = document.querySelector(containerSelector);
    this.size = {x: sizeX, y: sizeY};
    this.cells = [];
    this.cursor = new Cursor(0, 0, sizeX, sizeY);

    this.initGrid();
  }

  initGrid() {
    document.addEventListener("DOMContentLoaded", () => {
      for (let i = 0; i < this.size.y * this.size.x; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        this.container.appendChild(cell);
      }
    });
  }

  highlightCell() {
    const index = this.cursor.getCursorIdx();
    if (index >= 0 && index <= this.size.x * this.size.y) {
      this.container.children[index].classList.add('blinking');
    }
  }

  unhighlightCell() {
    const index = this.cursor.getCursorIdx();
    if (index >= 0 && index <= this.size.x * this.size.y) {
      this.container.children[index].classList.remove('blinking');
    }
  }

  setCurrentCellCharacter(char) {
    const index = this.cursor.getCursorIdx();
    if (index >= 0 && index <= this.size.x * this.size.y) {
      this.container.children[index].textContent = char;
    }
  }

  clearPreviousCell() {
    const index = this.cursor.getCursorIdx() - 1;
    if (index >=0 && index <= this.size.x * this.size.y) {
      this.container.children[index].textContent = "";
    }
  }
}
