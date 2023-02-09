/**
 * Bomb cell. Cannot appear on its own and can only be placed by the player. Explodes after 30
 * frames destroying every cell on a given radius.
 */

class Bomb extends Cell {
  constructor(x, y, explosionRadius) {
    super(x, y, 'bomb', '#24292f');
    this.explosionRadius = explosionRadius;
    this.explosionTimeout = 0;
  }

  _getExplosionCells(matrix) {
    this.explosionCells = [{ x: this.x, y: this.y }];

    const { x, y } = this;

    const addIfExists = (cellX, cellY) => {
      if (
        cellX >= 0
        && cellX < matrix[0].length
        && cellY >= 0
        && cellY <= matrix.length - 1
      ) {
        this.explosionCells.push({ x: cellX, y: cellY });
      }
    }

    for (let i = 1; i < this.explosionRadius; i++) {
      // Centre longest lines
      addIfExists(x - i, y);
      addIfExists(x + i, y);
      addIfExists(x, y - i);
      addIfExists(x, y + i);

      // From horizontal lines
      for (let j = 1; j < this.explosionRadius - i; j++) {
        addIfExists(x - i, y - j);
        addIfExists(x - i, y + j);
        addIfExists(x + i, y - j);
        addIfExists(x + i, y + j);
      }
    }
  }

  explode(matrix, cells) {
    this.explosionTimeout++;

    // Create a copy of matrix and cells so we don't have to mutate the paramaters
    const matrixCopy = [...matrix];
    const cellsCopy = { ...cells };

    let didExplode = false;

    if (this.explosionTimeout > 30) {
      didExplode = true;
      this._getExplosionCells(matrix);

      // Remove all cells in the explosion radius
      for (const { x, y } of this.explosionCells) {
        matrixCopy[y][x] = 'empty';

        for (const cellType in cellsCopy) {
          for (const i in cellsCopy[cellType]) {
            if (cellsCopy[cellType][i].x === x && cellsCopy[cellType][i].y === y) {
              if (
                cellsCopy[cellType][i].x !== this.x
                && cellsCopy[cellType][i].y !== this.y
                && cellsCopy[cellType][i].type === 'bomb'
              ) {
                cellsCopy[cellType][i].explosionTimeout = 30;
              } else {
                cellsCopy[cellType].splice(i, 1);
              }
              break;
            }
          }
        }
      };
    }

    return { matrix: matrixCopy, cells: cellsCopy };
  }
}
