class Animal extends MovingCell {
  constructor(x, y, type, colour, gender) {
    super(x, y, type, colour);
    this.isImmune = false;
    this.gender = gender;
  }

  makeImmune() {
    if (!this.isImmune) {
      this.isImmune = true;
      this.colour = shade(this.colour, -50);
    }
  }

  reproduce(matrix, cells) {
    // Create copies of matrix and cells not to mutate the parameters
    const matrixCopy = [...matrix];
    const cellsCopy = [...cells];

    const oppositeGenderCells = this
      .getSurroundingCells(matrix, this.type)
      .filter((cell) => cell.gender !== this.gender);

    const emptyCell = random(this.getSurroundingCells(matrixCopy, 'empty'));
    const mateCell = random(oppositeGenderCells);

    if (emptyCell && mateCell) {
      const { x, y } = emptyCell;
      const newCell = new this.constructor(x, y, random([true, false]));

      cellsCopy.push(newCell);
      matrixCopy[y][x] = this.type;
    }

    return { matrix: matrixCopy, cells: cellsCopy };
  }
}
