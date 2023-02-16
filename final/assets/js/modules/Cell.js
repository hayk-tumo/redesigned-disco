class Cell {
  constructor(x, y, type, colour) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.colour = colour;
  }

  // Directions is a getter so it will have up-to-date values every time you try to get it
  get directions() {
    return [
      { x: this.x - 1, y: this.y - 1 },
      { x: this.x - 1, y: this.y },
      { x: this.x - 1, y: this.y + 1 },
      { x: this.x, y: this.y - 1 },
      { x: this.x, y: this.y + 1 },
      { x: this.x + 1, y: this.y - 1 },
      { x: this.x + 1, y: this.y },
      { x: this.x + 1, y: this.y + 1 },
    ]
  }

  // Gets the coordinates of its 8 surrounding cells of the given type
  getSurroundingCells(matrix, type) {
    const foundCells = [];

    const types = Array.isArray(type) ? type : [type];

    for (const { x, y } of this.directions) {
      if (
        x >= 0
        && x < matrix[0].length
        && y >= 0
        && y < matrix.length
        && types.includes(matrix[y][x])
      ) {
        foundCells.push({ x, y });
      }
    }

    return foundCells;
  }
}
