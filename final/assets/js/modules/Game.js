class Game {
  constructor(userConfig, callback = () => {}) {
    // Default config
    const defaultConfig = {
      columns: 30,
      rows: 30,
      cellSize: 20,
      fps: 10,
      parent: document.body,
    };

    // Override the default config with user config
    const { columns, rows, cellSize, fps, parent } = { ...defaultConfig, ...userConfig }

    // Define parameters
    this.columns = columns;
    this.rows = rows;
    this.cellSize = cellSize;
    this.fps = fps;
    this.parent = parent;

    this.callback = callback;

    this.matrix = [];

    this._createRandomMatrix();
    this._createCellGroups();

    this._render();
  }

  // Creates the matrix
  _createRandomMatrix() {
    this.matrix = new Array(this.rows)
      .fill(null)
      .map(() => (
        new Array(this.rows)
          .fill(null)
          .map(() => {
            const random = Math.random();

            // 40% Grass
            if (random <= 0.4) {
              return 'grass';
            }

            // 5% Herbivore
            if (random <= 0.45) {
              return 'herbivore';
            }

            // 10% Wild
            if (random <= 0.55) {
              return 'wild';
            }

            return 'empty';
          })
      ));
  }

  // Creates a p5 instance
  _render() {
    const canvasInstance = (canvas) => {
      // Draws the cells from the matrix
      canvas.drawCells = () => {
        canvas.background('#eaeef2');

        const cells = [
          this.grassCells,
          this.herbivoreCells,
          this.wildCells,
          this.bombCells,
          this.virusCells,
        ];

        for (const cellType of cells) {
          for (const cell of cellType) {
            if (!cell.colour) console.log(cell.type)
            canvas.fill(cell.colour);
            canvas.rect(cell.x * this.cellSize, cell.y * this.cellSize, this.cellSize);
          }
        }
      }

      // Setup - only run when Canvas is created
      canvas.setup = () => {
        canvas.createCanvas(this.columns * this.cellSize, this.rows * this.cellSize);
        canvas.background('#eaeef2');
        canvas.frameRate(this.fps);
        canvas.noStroke();
      };

      // Draw - runs every frame
      canvas.draw = () => {
        // Add a bomb if the mouse is pressed
        if (canvas.mouseIsPressed) {
          const cellX = (canvas.mouseX - (canvas.mouseX % this.cellSize)) / this.cellSize;
          const cellY = (canvas.mouseY - (canvas.mouseY % this.cellSize)) / this.cellSize;

          if (
            cellX >= 0
            && cellX < this.matrix[0].length
            && cellY >= 0
            && cellY < this.matrix.length
            && this.matrix[cellY][cellX] !== 'bomb'
          ) {
            const explosionRadius = Math.min(this.columns, this.rows) / 3;

            this.matrix[cellY][cellX] = 'bomb';
            this.bombCells.push(new Bomb(cellX, cellY, explosionRadius));
          }
        }

        // Bomb cells
        for (const bombCell of this.bombCells) {
          const updated = bombCell.explode(this.matrix, {
            grass: this.grassCells,
            herbivore: this.herbivoreCells,
            wild: this.wildCells,
            virus: this.virusCells,
            bomb: this.bombCells,
          });

          if (updated.didExplode) {
            this.matrix = updated.matrix;
            this.grassCells = updated.cells.grass;
            this.herbivoreCells = updated.cells.herbivore;
            this.wildCells = updated.cells.wild;
            this.virusCells = updated.cells.virus;
            this.bombCells = updated.cells.bomb;
          }
        }

        // Grass cells
        for (const grassCell of this.grassCells) {
          const updated = grassCell.reproduce(this.matrix, this.grassCells);
          this.matrix = updated.matrix;
          this.grassCells = updated.cells;
        }

        // Herbivore cells
        for (const herbivoreCell of this.herbivoreCells) {
          // Move, lose energy
          this.matrix = herbivoreCell.move(this.matrix).matrix;

          if (herbivoreCell.energy <= 0) {
            // The cell is dead
            const updated = herbivoreCell.die(this.matrix, this.herbivoreCells);
            this.matrix = updated.matrix;
            this.herbivoreCells = updated.cells;
          } else {
            // Eat, gain energy
            const updated = herbivoreCell.eat(this.matrix, this.grassCells, this.virusCells);
            this.matrix = updated.matrix;
            this.grassCells = updated.grass;
            this.virusCells = updated.virus;

            if (herbivoreCell.energy >= 11) {
              // Reproduce
              const updated = herbivoreCell.reproduce(this.matrix, this.herbivoreCells);
              this.matrix = updated.matrix;
              this.herbivoreCells = updated.cells;
            }
          }
        }

        // Virus cells
        for (const virusCell of this.virusCells) {
          this.matrix = virusCell.move(this.matrix).matrix;

          if (virusCell.energy <= 0) {
            // The cell is dead
            const updated = virusCell.die(this.matrix, this.virusCells);
            this.matrix = updated.matrix;
            this.virusCells = updated.cells;
          } else {
            // Eat
            const updated = virusCell.eat(this.matrix, {
              herbivore: this.herbivoreCells,
              wild: this.wildCells,
            });

            this.matrix = updated.matrix;
            this.herbivoreCells = updated.cells.herbivore;
            this.wildCells = updated.cells.wild;
          }
        }

        // Wild cells
        for (const wildCell of this.wildCells) {
          // Move, lose energy
          this.matrix = wildCell.move(this.matrix).matrix;

          if (wildCell.energy <= 0) {
            // The cell is dead
            const updated = wildCell.die(this.matrix, this.wildCells);
            this.matrix = updated.matrix;
            this.wildCells = updated.cells;
          } else {
            // Eat, gain energy
            const updated = wildCell.eat(this.matrix, this.herbivoreCells);
            this.matrix = updated.matrix;
            this.herbivoreCells = updated.herbivores;

            if (wildCell.energy >= 11) {
              // Reproduce
              const updated = wildCell.reproduce(this.matrix, this.wildCells);
              this.matrix = updated.matrix;
              this.wildCells = updated.cells;
            }
          }
        }

        canvas.drawCells();

        this.callback(this);
      };
    };

    this.canvas = new p5(canvasInstance, this.parent);
  }

  // Create an array of every cell type
  _createCellGroups() {
    this.grassCells = [];
    this.herbivoreCells = [];
    this.wildCells = [];
    this.bombCells = [];
    this.virusCells = [];

    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        if (this.matrix[y][x] === 'grass') {
          this.grassCells.push(new Grass(x, y));
        } else if (this.matrix[y][x] === 'herbivore') {
          this.herbivoreCells.push(new Herbivore(x, y));
        } else if (this.matrix[y][x] === 'wild') {
          this.wildCells.push(new Wild(x, y));
        }
      }
    }
  }
}
