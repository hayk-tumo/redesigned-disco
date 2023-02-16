const grassValue = document.getElementById('grass');
const herbivoreValue = document.getElementById('herbivores');
const wildValue = document.getElementById('wild-animals');
const bombValue = document.getElementById('bombs');
const virusValue = document.getElementById('viruses');

const gameOptions = {
  columns: 85,
  rows: 85,
  cellSize: 10,
  fps: 60,
  parent: 'canvas-wrapper',
};

const liveCount = (game) => {
  grassValue.innerHTML = game.grassCells.length;
  herbivoreValue.innerHTML = game.herbivoreCells.length;
  wildValue.innerHTML = game.wildCells.length;
  bombValue.innerHTML = game.bombCells.length;
  virusValue.innerHTML = game.virusCells.length;
};

const game = new Game(gameOptions, liveCount);
