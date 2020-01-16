const GameBoard = () => {
  const createBoard = () => {
    const board = Array(10).fill(false).map(x => Array(10).fill(false));
    return board;
  }

  const canMove = (x, y, board) => {
    if (typeof board[x, y] === 'integer') {
      return false;
    }
    return true;
  }

  const getOptions = () => {
    arr = [];
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        arr.push([i, j]);
      }
    }
    return arr;
  }

  const checkNull = (x, y, board) => {
    if(typeof board[x] === 'undefined') {
      return true;
    } else if (typeof board[x][y] === 'undefined') {
      return true;
    }
    return false;
  }

  const anyBoatArround = (x, y, board, ship) => {
    if(board[x][y] === 'string' && board[x][y] !== ship.name) {
      return true;
    } else if(!checkNull(x + 1, y, board) && board[x + 1][y] !== false && board[x][y] !== ship.name) {
      return true;
    } else if(!checkNull(x - 1, y, board) && board[x - 1][y] !== false && board[x][y] !== ship.name) {
      return true;
    } else if(!checkNull(x, y + 1, board) && board[x][y + 1] !== false && board[x][y] !== ship.name) {
      return true;
    } else if(!checkNull(x, y - 1, board) && board[x][y - 1] !== false && board[x][y] !== ship.name) {
      return true;
    } else if(!checkNull(x + 1, y + 1, board) && board[x + 1][y + 1] !== false && board[x][y] !== ship.name) {
      return true;
    } else if(!checkNull(x - 1, y - 1, board) && board[x - 1][y - 1] !== false && board[x][y] !== ship.name) {
      return true;
    } else if(!checkNull(x + 1, y - 1, board) && board[x + 1][y - 1] !== false && board[x][y] !== ship.name) {
      return true;
    } else if(!checkNull(x - 1, y + 1, board) && board[x - 1][y + 1] !== false && board[x][y] !== ship.name) {
      return true;
    }
    return false;
  }

  const canPlace = (x, y, board, direction, ship) => {
    if (direction == 'horizontal') {
      for (let i = y; i < ship.size + y; i += 1) {
        if (board[x][i] != false || board[x][i] == null || anyBoatArround(x, i, board, ship)) {
          return false;
        }
      }
    } else if (direction == 'vertical') {
      for (let i = x; i < ship.size + x; i += 1) {
        if (board[i] == null) {
          return false;
        } else if (board[i][y] != false || anyBoatArround(i, y, board, ship)) {
          return false;
        }
      }
    }
    return true;
  }

  const addShip = (x, y, board, direction, ship) => {
    if (direction == 'horizontal' && canPlace(x, y, board, direction, ship)) {
      for (let i = y; i < ship.size + y; i += 1) {
        board[x][i] = ship.name;
      }
    } else if (direction == 'vertical' && canPlace(x, y, board, direction, ship)) {
      for (let i = x; i < ship.size + x; i += 1) {
        board[i][y] = ship.name;
      }
    }
  }

  const attack = (shipName, ships) => {
    const ship = ships.find(element => element.name == shipName);
    ship.hit();
  }

  const receiveAttack = (x, y, board, ships) => {
    if (typeof board[x][y] == 'string') {
      attack(board[x][y], ships);
      board[x][y] = 1;
    } else if (typeof board[x][y] == 'boolean') {
      board[x][y] = 0;
    }
  }

  const allShipsSunk = (ships) => {
    return ships.every(ship => ship.isSunk());
  }

  return { createBoard, addShip, canPlace, receiveAttack, allShipsSunk, canMove, getOptions, checkNull };
}

module.exports = GameBoard;
