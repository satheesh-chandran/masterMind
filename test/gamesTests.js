const assert = require('chai').assert;
const sinon = require('sinon');
const { Game, Games } = require('../src/games');

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

const getRandomNumber = sinon.fake.returns(0);

describe('Game', function() {
  describe('addColor', function() {
    it('should give true after adding the code color', function() {
      const game = new Game(1);
      assert.isTrue(game.addColor(getRandomNumber));
      const gameCopy = {
        id: 1,
        activeRow: 1,
        codeColor: ['red', 'brown', 'blue', 'orange', 'green'],
        isCracked: false,
        isGameOver: false
      };
      assert.deepStrictEqual(game, gameCopy);
    });
  });

  describe('getCodeColor', function() {
    it('should give the code color', function() {
      const game = new Game(1);
      game.addColor(getRandomNumber);
      const codeColors = ['red', 'brown', 'blue', 'orange', 'green'];
      assert.deepStrictEqual(game.getCodeColor(), codeColors);
    });
  });

  describe('check', function() {
    it('should give check isCracked true result ', () => {
      const game = new Game(1);
      game.addColor(getRandomNumber);
      const colors = ['red', 'brown', 'blue', 'orange', 'green'];
      const checkResult = game.check(colors);
      const expected = {
        result: [0, 5],
        activeRow: 2,
        isCracked: true,
        gameOver: false
      };
      assert.deepStrictEqual(checkResult, expected);
    });
  });

  describe('check', function() {
    it('should give check isCracked true result ', () => {
      const game = new Game(1);
      game.addColor(getRandomNumber);
      const colors = ['red', 'brown', 'blue', 'orange', 'purple'];
      for (let index = 0; index < 9; index++) {
        game.check(colors);
      }
      const checkResult = game.check(colors);
      const expected = {
        result: [0, 4],
        activeRow: 11,
        isCracked: false,
        gameOver: true
      };
      assert.deepStrictEqual(checkResult, expected);
    });
  });
});

describe('Games', function() {
  describe('add', function() {
    it('should return true after adding a new game', function() {
      const games = new Games();
      assert.isTrue(games.add(1, getRandomNumber));
    });
  });

  describe('findGame', function() {
    it('should return the game instance corresponding to the given id', () => {
      const games = new Games();
      games.add(1, getRandomNumber);
      const expected = {
        id: 1,
        activeRow: 1,
        codeColor: ['red', 'brown', 'blue', 'orange', 'green'],
        isCracked: false,
        isGameOver: false
      };
      assert.deepStrictEqual(games.findGame(1), expected);
    });

    it('should return undefined if the gameId is not present', () => {
      const games = new Games();
      games.add(1, getRandomNumber);
      assert.isUndefined(games.findGame(2));
    });
  });

  describe('getColors', function() {
    it('should return the source colors', function() {
      const games = new Games();
      assert.deepStrictEqual(games.getColors(), sourceColors);
    });
  });

  describe('delete', function() {
    it('should delete the game corresponding to the given id', function() {
      const games = new Games();
      games.add(1, getRandomNumber);
      assert.isTrue(games.delete(1));
    });
  });

  describe('getCodeColor', function() {
    it('should give the code color of given game', function() {
      const games = new Games();
      games.add(1, getRandomNumber);
      const expected = ['red', 'brown', 'blue', 'orange', 'green'];
      assert.deepStrictEqual(games.getCodeColor(1), expected);
    });
  });

  describe('checkColors', function() {
    it('should give check result of the colors given', function() {
      const games = new Games();
      games.add(1, getRandomNumber);
      const expected = {
        result: [0, 5],
        activeRow: 2,
        isCracked: true,
        gameOver: false
      };
      const inputColors = ['red', 'brown', 'blue', 'orange', 'green'];
      assert.deepStrictEqual(games.checkColors(1, inputColors), expected);
    });
  });
});
