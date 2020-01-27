import GameBoard from '../gameBoard';
import Ship from '../ship';

describe('gameboard validity tests', () => {
  let gameBoard;
  let board;
  let ship;
  let ship2;

  beforeEach(() => {
    gameBoard = GameBoard();
    board = gameBoard.createBoard();
    ship = Ship(5, 'A');
    ship2 = Ship(4, 'B');
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

  test('Should not allow placing beside another ship', () => {
    let place = gameBoard.canPlace(0, 0, board, 'vertical', ship);
    expect(place).toBe(true);
    gameBoard.addShip(0, 0, board, 'vertical', ship);
    place = gameBoard.canPlace(0, 1, board, 'vertical', ship2);
    gameBoard.addShip(0, 1, board, 'vertical', ship2);
    expect(board[0][1]).toBe(false);
    gameBoard.addShip(5, 0, board, 'vertical', ship2);
    expect(board[5][0]).toBe(false);
    gameBoard.addShip(9, 0, board, 'horizontal', ship);
    gameBoard.addShip(9, 5, board, 'horizontal', ship2);
    expect(board[9][5]).toBe(false);
  });
});

describe('Receive Attack function', () => {
  let gameBoard;
  let board;
  let ships;

  beforeEach(() => {
    gameBoard = GameBoard();
    board = gameBoard.createBoard();
    ships = [Ship(5, 'A'), Ship(4, 'B'), Ship(3, 'C'), Ship(3, 'S'), Ship(2, 'D')];
  });

  test('hits a ship', () => {
    gameBoard.addShip(0, 4, board, 'horizontal', ships[0]);
    gameBoard.receiveAttack(0, 5, board, ships);
    expect(ships[0].life).toBe(ships[0].size - 1);
  });

  test('hits the water', () => {
    gameBoard.receiveAttack(0, 0, board, ships);
    expect(board[0][0]).toBe(0);
  });

  test('ships are not sunk', () => {
    expect(gameBoard.allShipsSunk(ships)).toBe(false);
  });

  test('all ships are sunk', () => {
    ships.forEach(ship => {
      ship.life = 0;
    });
    expect(gameBoard.allShipsSunk(ships)).toBe(true);
  });
});
