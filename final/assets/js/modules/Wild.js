/**
 * Wild cell: Eats herbivore cells. Reproduces after eating 5 herbivores. Dies after not eating 2
 * herbivores.
 */

 class Wild extends Animal {
  constructor(x, y) {
    super(x, y, 'wild', '#fa4549');
    this.energy = 7;
  }

  move(matrix) {
    this.energy -= 2;

    // Create copies of matrix and cells not to mutate the parameters
    const matrixCopy = [...matrix];

    const emptyCell = random(this.getSurroundingCells(matrixCopy, 'empty'));

    if (emptyCell) {
      const { x, y } = emptyCell;

      matrixCopy[this.y][this.x] = 'empty';
      matrixCopy[y][x] = 'wild';

      this.x = x;
      this.y = y;
    }

    return { matrix: matrixCopy };
  }

  // gevorg.h28.y@tumo.org

  eat(matrix, herbivores) {
    // Create copies of matrix and cells not to mutate the parameters
    const matrixCopy = [...matrix];
    const herbivoresCopy = [...herbivores];

    const herbivoreCell = random(this.getSurroundingCells(matrixCopy, 'herbivore'));

    if (herbivoreCell) {
      const { x, y } = herbivoreCell;

      matrixCopy[this.y][this.x] = 'empty';
      matrixCopy[y][x] = 'wild';

      this.x = x;
      this.y = y;

      // Remove the herbivore from herbivore object
      for (const i in herbivoresCopy) {
        if (x === herbivoresCopy[i].x && y === herbivoresCopy[i].y) {
          herbivoresCopy.splice(i, 1);
          break;
        }
      }

      this.energy += 3;
    }

    return { matrix: matrixCopy, herbivores: herbivoresCopy };
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

  reproduce(matrix, cells) {
    // Create copies of matrix and cells not to mutate the parameters
    const matrixCopy = [...matrix];
    const cellsCopy = [...cells];

    const emptyCell = random(this.getSurroundingCells(matrixCopy, 'empty'));

    if (emptyCell) {
      const { x, y } = emptyCell;
      const newWild = new Wild(x, y);

      cellsCopy.push(newWild);
      matrixCopy[y][x] = 'wild';
    }

    return { matrix: matrixCopy, cells: cellsCopy };
  }
}