class Game {
  constructor(id) {
    this.id = id;
  }
}

class Games {
  constructor() {
    this.games = [];
  }

  add(game) {
    this.games.push(game);
    return true;
  }
}

module.exports = { Games, Game };
