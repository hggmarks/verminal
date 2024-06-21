export class Cursor {
  constructor(x, y, bufferSizeX, bufferSizeY) {
    this.position = {x:x, y:y};
    this.bufferSize = {x:bufferSizeX, y:bufferSizeY};
    this.bufferCellsCount = bufferSizeX * bufferSizeY;
  }

  getCursorIdx() {
    return this.position.x + (this.position.y * this.bufferSize.x);
  }

  moveCol(val) {
    if (this.position.x + val >= 0 && this.position.x <= this.bufferSize.x - 1) {
      this.position.x += val;
      console.log(this.position);
    }
  } 

  moveRow(val) {
    if (this.position.y + val >= 0 && this.position.y < this.bufferSize.y - 1) {
      this.position.y += val;
      console.log(this.position);
    }
  }

  carriageReturn() {
    this.position.x = 0;
  }

  lineFeed() {
    this.moveRow(1);
  }
}
