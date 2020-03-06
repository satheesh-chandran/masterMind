const { floor, random } = Math;

const sourceColors = [
  'red',
  'brown',
  'blue',
  'orange',
  'green',
  'purple',
  'yellow',
  'pink'
];

const getRandomNumber = (min, max) => floor(random() * (max - min) + min);

class Game {
  constructor(id) {
    this.id = id;
    this.activeRow = 1;
    this.codeColor = [];
    this.isCracked = false;
    this.isGameOver = false;
  }

  addColor() {
    const colorCopy = sourceColors.slice();
    while (this.codeColor.length < 5) {
      const colorIndex = getRandomNumber(0, colorCopy.length);
      this.codeColor.push(colorCopy[colorIndex]);
      colorCopy.splice(colorIndex, 1);
    }
    return true;
  }

  check(colors) {
    const result = [0, 0];
    colors.forEach(color => this.codeColor.includes(color) && result[0]++);
    colors.forEach((color, index) => {
      color === this.codeColor[index] && result[0]-- && result[1]++;
      if (result[1] === 5) {
        this.isCracked = true;
      }
    });
    if (this.activeRow === 10) {
      this.isGameOver = true;
    }
    this.activeRow++;
    return {
      result,
      activeRow: this.activeRow,
      isCracked: this.isCracked,
      gameOver: this.isGameOver
    };
  }

  getCodeColor() {
    return this.codeColor;
  }
}

class Games {
  constructor() {
    this.games = [];
    this.colors = sourceColors.slice();
  }

  add(id) {
    const game = new Game(id);
    game.addColor();
    console.log(game);
    this.games.push(game);
    return true;
  }

  findGame(id) {
    return this.games.find(game => game.id === id);
  }

  getColors() {
    return this.colors;
  }

  delete(id) {
    const gameIndex = this.games.findIndex(game => game.id === id);
    this.games.splice(gameIndex, 1);
    return true;
  }

  getCodeColor(gameId) {
    return this.findGame(gameId).getCodeColor();
  }

  checkColors(id, colors) {
    const game = this.findGame(id);
    return game.check(colors);
  }
}

module.exports = { Games, Game };
