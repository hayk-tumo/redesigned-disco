/**
 * Grass cell. Reproduces by appearing on its surrounding empty cells every 8 frame. Has no special
 * abilities.
 */

class Grass extends Cell {
  constructor(x, y) {
    super(x, y, 'grass', '#2da44e');
  }

  reproduce(matrix, cells) {
    // Create copies of matrix and cells not to mutate the parameters
    const matrixCopy = [...matrix];
    const cellsCopy = [...cells];

    const emptyCell = random(this.getSurroundingCells(matrixCopy, 'empty'));

    if (emptyCell) {
      const { x, y } = emptyCell;
      const newGrass = new Grass(x, y);

      cellsCopy.push(newGrass);
      matrixCopy[y][x] = 'grass';

      this.reproduction = 0;
    }

    return { matrix: matrixCopy, cells: cellsCopy };
  }
}
