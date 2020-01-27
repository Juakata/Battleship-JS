const Player = (ships, gameBoard) => ({
  ships,
  board: gameBoard.createBoard(),
  options: gameBoard.getOptions(),
  getRandomPositions() {
    const r1 = Math.floor(Math.random() * 10);
    const r2 = Math.floor(Math.random() * 10);
    let r3 = Math.floor(Math.random() * 2);
    if (r3 === 0) {
      r3 = 'horizontal';
    } else {
      r3 = 'vertical';
    }

    return [r1, r2, r3];
  },
  changeShip(origin, first, steps) {
    const ox = parseInt(origin.id.split('-')[1], 10);
    const oy = parseInt(origin.id.split('-')[2], 10);
    let x = parseInt(first.id.split('-')[1], 10);
    let y = parseInt(first.id.split('-')[2], 10);
    const shipSaved = [];
    const shipName = this.board[ox][oy];
    const ship = ships.find((element) => element.name === shipName);
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (this.board[i][j] === shipName) {
          shipSaved.push([i, j]);
          this.board[i][j] = false;
        }
      }
    }
    steps.forEach((step) => {
      const go = step.split('-')[0];
      const max = step.split('-')[1];
      for (let i = 0; i < max; i += 1) {
        switch (go) {
          case 'up':
            x -= 1;
            break;
          case 'left':
            y -= 1;
            break;
          default:
            break;
        }
      }
    });
    const result = gameBoard.canPlace(x, y, this.board, ship.orientation, ship);
    if (result) {
      gameBoard.addShip(x, y, this.board, ship.orientation, ship);
    } else {
      shipSaved.forEach((save) => {
        this.board[save[0]][save[1]] = shipName;
      });
    }
    return result;
  },
  placeShips() {
    this.board = gameBoard.createBoard();
    let randoms;
    let result;
    let i = 0;
    while (i < 5) {
      randoms = this.getRandomPositions();
      result = gameBoard.canPlace(randoms[0], randoms[1], this.board, randoms[2], ships[i]);
      if (result) {
        gameBoard.addShip(randoms[0], randoms[1], this.board, randoms[2], ships[i]);
        i += 1;
      }
    }
    this.options = gameBoard.getOptions();
  },
  removeFromOption(arr) {
    let i = 0;
    while (i < this.options.length) {
      if (arr[0] === this.options[i][0] && arr[1] === this.options[i][1]) {
        this.options.splice(i, 1);
        i = 100;
      }
      i += 1;
    }
  },
  makeMove(x, y, board, shipsArr) {
    if (this.options.length > 0) {
      this.removeFromOption([x, y]);
      gameBoard.receiveAttack(x, y, board, shipsArr);
    }
  },
  makeAttacks(ship, computer) {
    const { board } = computer;
    const elements = [];
    if (ship.orientation === 'vertical') {
      for (let i = ship.first[0]; i < ship.size + ship.first[0]; i += 1) {
        elements.push([i, ship.first[1]]);
      }
    } else {
      for (let i = ship.first[1]; i < ship.size + ship.first[1]; i += 1) {
        elements.push([ship.first[0], i]);
      }
    }
    elements.forEach((e) => {
      if (!gameBoard.checkNull(e[0] + 1, e[1], board) && typeof board[e[0] + 1][e[1]] !== 'number') {
        this.makeMove(e[0] + 1, e[1], board, ships);
        document.getElementById(`C-${e[0] + 1}-${e[1]}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] - 1, e[1], board) && typeof board[e[0] - 1][e[1]] !== 'number') {
        this.makeMove(e[0] - 1, e[1], board, ships);
        document.getElementById(`C-${e[0] - 1}-${e[1]}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0], e[1] + 1, board) && typeof board[e[0]][e[1] + 1] !== 'number') {
        this.makeMove(e[0], e[1] + 1, board, ships);
        document.getElementById(`C-${e[0]}-${e[1] + 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0], e[1] - 1, board) && typeof board[e[0]][e[1] - 1] !== 'number') {
        this.makeMove(e[0], e[1] - 1, board, ships);
        document.getElementById(`C-${e[0]}-${e[1] - 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] + 1, e[1] + 1, board) && typeof board[e[0] + 1][e[1] + 1] !== 'number') {
        this.makeMove(e[0] + 1, e[1] + 1, board, ships);
        document.getElementById(`C-${e[0] + 1}-${e[1] + 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] - 1, e[1] - 1, board) && typeof board[e[0] - 1][e[1] - 1] !== 'number') {
        this.makeMove(e[0] - 1, e[1] - 1, board, ships);
        document.getElementById(`C-${e[0] - 1}-${e[1] - 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] + 1, e[1] - 1, board) && typeof board[e[0] + 1][e[1] - 1] !== 'number') {
        this.makeMove(e[0] + 1, e[1] - 1, board, ships);
        document.getElementById(`C-${e[0] + 1}-${e[1] - 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] - 1, e[1] + 1, board) && typeof board[e[0] - 1][e[1] + 1] !== 'number') {
        this.makeMove(e[0] - 1, e[1] + 1, board, ships);
        document.getElementById(`C-${e[0] - 1}-${e[1] + 1}`).className = 'water';
      }
    });
  },
  gameOver() {
    return gameBoard.allShipsSunk(ships);
  },
});

module.exports = Player;
