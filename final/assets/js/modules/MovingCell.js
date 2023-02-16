class MovingCell extends Cell {
  move(matrix, energy) {
    this.energy -= energy;

    // Create copies of matrix and cells not to mutate the parameters
    const matrixCopy = [...matrix];

    const emptyCell = random(this.getSurroundingCells(matrixCopy, 'empty'));

    if (emptyCell) {
      const { x, y } = emptyCell;

      matrixCopy[this.y][this.x] = 'empty';
      matrixCopy[y][x] = this.type;

      this.x = x;
      this.y = y;
    }

    return { matrix: matrixCopy };
  }

  die(matrix, cells) {
    // Create copies of matrix and cells not to mutate the parameters
    const matrixCopy = [...matrix];
    const cellsCopy = [...cells];

    matrixCopy[this.y][this.x] = 'empty';

    // Remove from the list
    for (const i in cellsCopy) {
      if (this.x === cellsCopy[i].x && this.y === cellsCopy[i].y) {
        cellsCopy.splice(i, 1);
        break;
      }
    }

    return { matrix: matrixCopy, cells: cellsCopy };
  }
}
