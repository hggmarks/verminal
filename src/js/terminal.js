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
        cell.classList.add('cell', `${i}`, i === 0 ? 'blinking' : null);
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

  setCurrentCellCharacter(char, color) {
    const index = this.cursor.getCursorIdx();
    if (index >= 0 && index <= this.size.x * this.size.y) {
      char === ' ' ? 
        this.container.children[index].innerHTML = '&#8203;' + char :
        this.container.children[index].textContent = char;
      this.container.children[index].style.color = color ? color : "#ececec";
    }
  }

  clearPreviousCell() {
    const index = this.cursor.getCursorIdx() - 1;
    if (index >=0 && index <= this.size.x * this.size.y) {
      this.container.children[index].textContent = "";
    }
  }

  printStr(s, color) {
    s.foreach(char => {
      this.setCurrentCellCharacter(char, color);
      this.cursor.moveCol(1);
    });
  }

  printStrLn(s, color) {
    s.foreach(char => {
      this.setCurrentCellCharacter(char, color);
      this.cursor.moveCol(1);
      this.cursor.carriageReturn();
      this.cursor.lineFeed();
    });
  }

}
