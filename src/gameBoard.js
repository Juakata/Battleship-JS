const GameBoard = () => {
  const createBoard = () => {
    const board = Array(10).fill(false).map(x => Array(10).fill(false));
    return board;
  }

  const addShip = (x, y, board, direction, ship) => {
    if (direction == 'horizontal' && canPlace()) {
      for (let i = y; i < ship.size + y; i += 1) {
        board[x][i] = ship.name;
      }
    } else if (direction == 'vertical' && canPlace()) {
      for (let i = x; i < ship.size + x; i += 1) {
        board[i][y] = ship.name;
      }
    }
  }

  const canPlace = (x, y, board, direction, ship) => {
    if (direction == 'horizontal') {
      for (let i = y; i < ship.size + y; i += 1) {
        if (board[x][i] != false || board[x][i] == null) {
          return false;
        }
      }
    } else if (direction == 'vertical') {
      for (let i = x; i < ship.size + x; i += 1) {
        if (board[i] == null) {
          return false;
        } else if (board[i][y] != false) {
          return false;
        }
      }
    }
    return true;
  }

  const attack = (shipName, n, ships) => {
    const ship = ships.find(element => element.name == shipName);
    ship.hit(n);
  }

  const receiveAttack = (x, y, board, n, ships) => {
    if (typeof board[x][y] == 'string') {
      attack(board[x][y], n, ships);
    } else if (typeof board[x][y] == 'boolean') {
      board[x][y] = 0;
    }
  }

  const allShipsSunk = (ships) => {
    return ships.every(ship => ship.isSunk());
  }

  return { createBoard, addShip, canPlace, receiveAttack, allShipsSunk };
}

module.exports = GameBoard;
