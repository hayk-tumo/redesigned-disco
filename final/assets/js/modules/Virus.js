/**
 * Virus cell. Kills herbivores and wild animals just by touching them. Cannot reproduce and dies
 * after 15 frames of its existence. Appears by 0.5% chance when a grass is eaten by a herbivore.
 */

 class Virus extends MovingCell {
  constructor(x, y) {
    super(x, y, 'virus', '#a475f9');
    this.energy = 15;
  }

  eat(matrix, livingCells) {
    // Create copies of matrix and cells not to mutate the parameters
    const matrixCopy = [...matrix];
    const livingCellsCopy = { ...livingCells };

    const livingCell = random(this.getSurroundingCells(matrixCopy, ['herbivore', 'wild']));

    if (livingCell) {
      const { x, y } = livingCell;
      const kill = Math.random() < 0.8;

      // 80% chance of killing
      if (kill) {
        matrixCopy[this.y][this.x] = 'empty';
        matrixCopy[y][x] = 'virus';

        this.x = x;
        this.y = y;
      }

      // Remove or make immune
      for (const cellType in livingCellsCopy) {
        for (const i in livingCellsCopy[cellType]) {
          if (
            x === livingCellsCopy[cellType][i].x
            && y === livingCellsCopy[cellType][i].y
            && !livingCellsCopy[cellType][i].isImmune
          ) {
            if (kill) {
              livingCellsCopy[cellType].splice(i, 1);
            } else {
              livingCellsCopy[cellType][i].makeImmune();
            }

            break;
          }
        }
      }
    }

    return { matrix: matrixCopy, cells: livingCellsCopy };
  }
}
