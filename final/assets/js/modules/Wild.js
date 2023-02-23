/**
 * Wild cell: Eats herbivore cells. Reproduces after eating 5 herbivores. Dies after not eating 2
 * herbivores.
 */

 class Wild extends Animal {
  constructor(x, y, gender) {
    super(x, y, 'wild', '#fa4549', gender);
    this.energy = 7;
  }

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
}
