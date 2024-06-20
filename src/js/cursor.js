export class Cursor {
  constructor(x, y, bufferSizeX, bufferSizeY) {
    this.position = {x:x, y:y};
    this.bufferSize = {x:bufferSizeX, y:bufferSizeY};
    this.bufferCellsCount = bufferSizeX * bufferSizeY;
  }

  moveRow(val) {
      this.position.x += val;
      console.log(this.position);
  } 

}
