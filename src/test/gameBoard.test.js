const GameBoard = require('../gameBoard');
const Ship = require('../ship');

describe('gameboard validity tests', () => {
  let gameBoard;
  let board;
  let ship;

  beforeEach(() => {
    gameBoard = GameBoard();
    board = gameBoard.createBoard();
    ship = Ship(5, 'A');
  });

  test('creates valid gameboard', () => {
    expect(board.length).toBe(10);
  });

  test('places a ship on the gameboard', () => {
    gameBoard.addShip(0, 4, board, 'horizontal', ship);
    for (let i = 4; i < 9; i += 1) {
      expect(board[0][i]).toBe(ship.name);
    }
  });

  test('cant place ship within a ship', () => {
    let place = gameBoard.canPlace(0, 4, board, 'horizontal', ship);
    expect(place).toBe(true);
    gameBoard.addShip(0, 4, board, 'horizontal', ship);
    place = gameBoard.canPlace(0, 4, board, 'horizontal', ship);
    expect(place).toBe(false);
  });

  test('cant place outside of the board', () => {
    let place = gameBoard.canPlace(0, 9, board, 'horizontal', ship);
    expect(place).toBe(false);
    place = gameBoard.canPlace(9, 0, board, 'vertical', ship);
    expect(place).toBe(false);
  });

});

describe('Receive Attack function', () => {
  let gameBoard;
  let board;
  let ship;
  let ships;

  beforeEach(() => {
    gameBoard = GameBoard();
    board = gameBoard.createBoard();
    ship = Ship(5, 'A');
    ships = [Ship(5, 'A'), Ship(4, 'B'), Ship(3, 'C'), Ship(3, 'S'), Ship(2, 'D')];
  });

  test('hits a ship', () => {
    gameBoard.addShip(0, 4, board, 'horizontal', ships[0]);
    gameBoard.receiveAttack(0, 5, board, 1, ships);
    expect(ships[0].life[1]).toBe(true);
  });

  test('hits the water', () => {
    gameBoard.receiveAttack(0, 0, board, 1, ships);
    expect(board[0][0]).toBe(0);
  });

  test('ships are not sunk', () => {
    expect(gameBoard.allShipsSunk(ships)).toBe(false);
  });

  test('all ships are sunk', () => {
    ships.forEach(ship => {
      for (let i = 0; i < ship.life.length; i += 1) {
        ship.life[i] = true;
      }
    });
    expect(gameBoard.allShipsSunk(ships)).toBe(true);
  });
});