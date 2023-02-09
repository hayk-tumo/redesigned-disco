/**
 * Herbivore cell. Eats grass cells. Reproduces after eating 5 grass cells. Dies after hunger for
 * 5 generations.
 */

class Herbivore extends Animal {
  constructor(x, y) {
    super(x, y, 'herbivore', '#eac54f');
    this.energy = 7;
  }

  move(matrix) {
    this.energy--;

    // Create copies of matrix and cells not to mutate the parameters
    const matrixCopy = [...matrix];

    const emptyCell = random(this.getSurroundingCells(matrixCopy, 'empty'));

    if (emptyCell) {
      const { x, y } = emptyCell;

      matrixCopy[this.y][this.x] = 'empty';
      matrixCopy[y][x] = 'herbivore';

      this.x = x;
      this.y = y;
    }

    return { matrix: matrixCopy };
  }

  eat(matrix, grass, virus) {
    // Create copies of matrix and cells not to mutate the parameters
    const matrixCopy = [...matrix];
    const grassCopy = [...grass];
    const virusCopy = [...virus];

    const grassCell = random(this.getSurroundingCells(matrixCopy, 'grass'));

    if (grassCell) {
      const { x, y } = grassCell;

      // 0.5% chance of the grass being replaced by a virus
      if (Math.random() < 0.005) {
        matrixCopy[y][x] = 'virus';
        virusCopy.push(new Virus(x, y));
      } else {
        matrixCopy[this.y][this.x] = 'empty';
        matrixCopy[y][x] = 'herbivore';

        this.x = x;
        this.y = y;
      }

      // Remove the grass from grass object
      for (const i in grassCopy) {
        if (x === grassCopy[i].x && y === grassCopy[i].y) {
          grassCopy.splice(i, 1);
          break;
        }
      }

      this.energy += 2;
    }

    return { matrix: matrixCopy, grass: grassCopy, virus: virusCopy };
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
      const newGrass = new Herbivore(x, y);

      cellsCopy.push(newGrass);
      matrixCopy[y][x] = 'herbivore';
    }

    return { matrix: matrixCopy, cells: cellsCopy };
  }
}