const Computer = require('../computer');
const Ship = require('../ship');
const GameBoard = require('../gameBoard');
const Player = require('../player');

describe('Player tests', () => {
  let computer;
  let ships;
  let gameBoard;
  let player;

  beforeEach(() => {
    gameBoard = GameBoard();
    ships = [Ship(5, 'A'), Ship(4, 'B'), Ship(3, 'C'), Ship(3, 'S'), Ship(2, 'D')];
    computer = Computer(ships, gameBoard);
    player = Player(ships, gameBoard);
  });

  test('Computer should have ships and a board', () => {
    expect(computer.ships.length).toBe(5);
    expect(computer.board.length).toBe(10);
  });

  test('Computer should have options', () => {
    expect(computer.options.length).toBe(100);
  });

  test('Computer place all the ships', () => {
    computer.placeShips();
    let count = 0;
    computer.board.forEach(e => {
      e.forEach(el => {
        if (typeof el === 'string') {
          count += 1;
        }
      })
    })
    expect(count).toBe(17);
  });

  test('Computer should make a valid attack', () => {
    let result = 0;
    expect(computer.options.length).toBe(100);
    for (let i = 0; i < 101; i += 1) {
      computer.makeMove(player.board, ships);
    }
    player.board.forEach(e => {
      if (e.includes(false)) {
        result += 1;
      }
    })
    expect(result).toBe(0);
    expect(computer.options.length).toBe(0);
  });

  test('Computer should be smart (horizontal)', () => {
    gameBoard.addShip(0, 0, player.board, 'horizontal', ships[0]);
    const not = [];
    const hit = computer.makeSmartMove(0, 0, player.board, ships, [0, 0, 'A']);
    let first = [0, 0, 'A'];
    go = computer.whereToGo(hit[0], hit[1], player.board, first, not);
    let move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([1, 0]);
    expect(move).toMatchObject([0, 0]);
    go = computer.whereToGo(move[0], move[1], player.board, first, go[1]);
    move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([0, 1]);
    expect(move).toMatchObject([0, 1]);
    go = computer.whereToGo(move[0], move[1], player.board, first, go[1]);
    move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([0, 2]);
    expect(move).toMatchObject([0, 2]);
    go = computer.whereToGo(move[0], move[1], player.board, first, go[1]);
    move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([0, 3]);
    expect(move).toMatchObject([0, 3]);
    go = computer.whereToGo(move[0], move[1], player.board, first, go[1]);
    move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([0, 4]);
  });

  test('Computer should destroy all ships', () => {
    player.placeShips();
    for (let i = 0; i < 5; i += 1) {
      let first, go, move;
      const not = [];
      while (!computer.smart) {
        first = computer.makeMove(player.board, ships);
      }
      go = computer.whereToGo(first[0], first[1], player.board, first, not);
      while (computer.smart) {
        move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
        go = computer.whereToGo(move[0], move[1], player.board, first, go[1]);
      }
    }
    let count = 0;
    player.board.forEach(e => {
      e.forEach(l => {
        if (typeof l === 'string') {
          count += 1;
        }
      });
    });
    expect(count).toBe(0);
  });

  test('Computer should destroy the ship horizontal at top and starting from the mid', () => {
    gameBoard.addShip(0, 5, player.board, 'horizontal', ships[0]);
    const not = [];
    const hit = computer.makeSmartMove(0, 7, player.board, ships, [0, 7, 'A']);
    let first = [0, 7, 'A'];
    go = computer.whereToGo(hit[0], hit[1], player.board, first, not);
    let move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([1, 7]);
    expect(move).toMatchObject([0, 7]);
    go = computer.whereToGo(move[0], move[1], player.board, first, go[1]);
    move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([0, 8]);
    expect(move).toMatchObject([0, 8]);
    go = computer.whereToGo(move[0], move[1], player.board, first, go[1]);
    move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([0, 9]);
    expect(move).toMatchObject([0, 9]);
    go = computer.whereToGo(move[0], move[1], player.board, first, go[1]);
    move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([0, 6]);
    expect(move).toMatchObject([0, 6]);
    go = computer.whereToGo(move[0], move[1], player.board, first, go[1]);
    move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([0, 5]);
    expect(move).toMatchObject([0, 5]);
  });

  test('Computer should destroy the ship vertical at left and starting from the mid', () => {
    gameBoard.addShip(2, 0, player.board, 'vertical', ships[1]);
    const not = [];
    const hit = computer.makeSmartMove(3, 0, player.board, ships, [3, 0, 'B']);
    let first = [3, 0, 'B'];
    go = computer.whereToGo(hit[0], hit[1], player.board, first, not);
    let move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([4, 0]);
    expect(move).toMatchObject([4, 0]);
    go = computer.whereToGo(move[0], move[1], player.board, first, go[1]);
    move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([5, 0]);
    expect(move).toMatchObject([5, 0]);
    go = computer.whereToGo(move[0], move[1], player.board, first, go[1]);
    move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([6, 0]);
    expect(move).toMatchObject([3, 0]);
    go = computer.whereToGo(move[0], move[1], player.board, first, go[1]);
    move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([2, 0]);
    expect(move).toMatchObject([2, 0]);
  });

  test('Computer should be smart destroying a vertical ship at the bottom', () => {
    gameBoard.addShip(6, 8, player.board, 'vertical', ships[1]);
    const not = [];
    const hit = computer.makeSmartMove(8, 8, player.board, ships, [8, 8, 'B']);
    let first = [8, 8, 'B'];
    go = computer.whereToGo(hit[0], hit[1], player.board, first, not);
    let move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([9, 8]);
    expect(move).toMatchObject([9, 8]);
    go = computer.whereToGo(move[0], move[1], player.board, first, go[1]);
    move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([7, 8]);
    expect(move).toMatchObject([7, 8]);
    go = computer.whereToGo(move[0], move[1], player.board, first, go[1]);
    move = computer.makeSmartMove(go[0][0], go[0][1], player.board, ships, first);
    expect(go[0]).toMatchObject([6, 8]);
    expect(move).toMatchObject([6, 8]);
  });
})
