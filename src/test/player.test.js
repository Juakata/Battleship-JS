const Player = require('../player');
const Ship = require('../ship');
const GameBoard = require('../gameBoard');
const Computer = require('../computer');

describe('Player tests', () => {
  let player;
  let ships;
  let gameBoard;
  let board;
  let computer;

  beforeEach(() => {
    gameBoard = GameBoard();
    ships = [Ship(5, 'A'), Ship(4, 'B'), Ship(3, 'C'), Ship(3, 'S'), Ship(2, 'D')];
    player = Player(ships, gameBoard);
    computer = Computer(ships, gameBoard);
  });

  test('Player should have ships and a board', () => {
    expect(player.ships.length).toBe(5);
    expect(player.board.length).toBe(10);
  })

  test('Player place all the ships randomly', () => {
    player.placeShips();
    let count = 0;
    player.board.forEach(e => {
      e.forEach(el => {
        if (typeof el === 'string') {
          count += 1;
        }
      })
    })
    expect(count).toBe(17);
  });

  test('Player makes a valid move', () => {
    let result = 0;
    expect(player.options.length).toBe(100);
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        player.makeMove(i, j, computer.board, 3, ships);
      }
    }
    computer.board.forEach(e => {
      if(e.includes(false)) {
        result += 1;
      }
    })
    expect(result).toBe(0);
    expect(player.options.length).toBe(0);
  });
})
