const Computer = (ships, gameBoard) => ({
  ships,
  board: gameBoard.createBoard(),
  options: gameBoard.getOptions(),
  smart: false,
  getRandomPositions() {
    const r1 = Math.floor(Math.random() * this.options.length);
    let r2 = Math.floor(Math.random() * 2);
    if (r2 === 0) {
      r2 = 'horizontal';
    } else {
      r2 = 'vertical';
    }

    return [r1, r2];
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
  makeAttacks(ship, player) {
    const { board } = player;
    const elements = [];
    const first = [0, 0, 'A'];
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
        this.makeSmartMove(e[0] + 1, e[1], board, ships, first);
        document.getElementById(`P-${e[0] + 1}-${e[1]}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] - 1, e[1], board) && typeof board[e[0] - 1][e[1]] !== 'number') {
        this.makeSmartMove(e[0] - 1, e[1], board, ships, first);
        document.getElementById(`P-${e[0] - 1}-${e[1]}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0], e[1] + 1, board) && typeof board[e[0]][e[1] + 1] !== 'number') {
        this.makeSmartMove(e[0], e[1] + 1, board, ships, first);
        document.getElementById(`P-${e[0]}-${e[1] + 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0], e[1] - 1, board) && typeof board[e[0]][e[1] - 1] !== 'number') {
        this.makeSmartMove(e[0], e[1] - 1, board, ships, first);
        document.getElementById(`P-${e[0]}-${e[1] - 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] + 1, e[1] + 1, board) && typeof board[e[0] + 1][e[1] + 1] !== 'number') {
        this.makeSmartMove(e[0] + 1, e[1] + 1, board, ships, first);
        document.getElementById(`P-${e[0] + 1}-${e[1] + 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] - 1, e[1] - 1, board) && typeof board[e[0] - 1][e[1] - 1] !== 'number') {
        this.makeSmartMove(e[0] - 1, e[1] - 1, board, ships, first);
        document.getElementById(`P-${e[0] - 1}-${e[1] - 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] + 1, e[1] - 1, board) && typeof board[e[0] + 1][e[1] - 1] !== 'number') {
        this.makeSmartMove(e[0] + 1, e[1] - 1, board, ships, first);
        document.getElementById(`P-${e[0] + 1}-${e[1] - 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] - 1, e[1] + 1, board) && typeof board[e[0] - 1][e[1] + 1] !== 'number') {
        this.makeSmartMove(e[0] - 1, e[1] + 1, board, ships, first);
        document.getElementById(`P-${e[0] - 1}-${e[1] + 1}`).className = 'water';
      }
    });
  },
  placeShips() {
    let randoms;
    let result;
    let i = 0;
    let hitOn;
    while (i < 5) {
      randoms = this.getRandomPositions();
      hitOn = this.options[randoms[0]];
      this.options.splice(randoms[0], 1);
      result = gameBoard.canPlace(hitOn[0], hitOn[1], this.board, randoms[1], ships[i]);
      if (result) {
        gameBoard.addShip(hitOn[0], hitOn[1], this.board, randoms[1], ships[i]);
        i += 1;
      }
    }
    this.options = gameBoard.getOptions();
  },
  makeMove(board, shipsArr) {
    const randoms = this.getRandomPositions();
    const hitOn = this.options[randoms[0]];
    if (this.options.length > 0) {
      this.options.splice(randoms[0], 1);
      const name = board[hitOn[0]][hitOn[1]];
      gameBoard.receiveAttack(hitOn[0], hitOn[1], board, shipsArr);
      if (board[hitOn[0]][hitOn[1]] === 1) {
        this.smart = true;
        return [hitOn[0], hitOn[1], name];
      }
    }
    return [hitOn[0], hitOn[1]];
  },
  whereToGo(a, b, board, first, not) {
    let x = a;
    let y = b;
    let no = not;
    let send;
    if (!gameBoard.checkNull(x + 1, y, board) && typeof board[x + 1][y] !== 'number' && !no.includes(0)) {
      send = [x + 1, y];
    } else if (!gameBoard.checkNull(x - 1, y, board) && typeof board[x - 1][y] !== 'number' && !no.includes(1)) {
      if (!not.includes(0)) {
        no.push(0);
      }
      send = [x - 1, y];
    } else if (!gameBoard.checkNull(x, y + 1, board) && typeof board[x][y + 1] !== 'number' && !no.includes(2)) {
      for (let i = 0; i < 2; i += 1) {
        if (!not.includes(i)) {
          no.push(i);
        }
      }
      send = [x, y + 1];
    } else if (!gameBoard.checkNull(x, y - 1, board) && typeof board[x][y - 1] !== 'number') {
      for (let i = 0; i < 3; i += 1) {
        if (!no.includes(i)) {
          no.push(i);
        }
      }
      send = [x, y - 1];
    } else {
      no = [];
      [x, y] = [first[0], first[1]];
      if (!gameBoard.checkNull(x - 1, y, board) && typeof board[x - 1][y] !== 'number') {
        send = [x - 1, y];
        no.push(0);
      } else {
        send = [x, y - 1];
        for (let i = 0; i < 3; i += 1) {
          no.push(i);
        }
      }
    }
    return [send, no];
  },
  makeSmartMove(x, y, board, shipsArr, first) {
    let send;
    if (this.options.length > 0) {
      if (typeof board[x][y] === 'string') {
        send = [x, y];
      } else {
        send = [first[0], first[1]];
      }
      this.removeFromOption([x, y]);
      gameBoard.receiveAttack(x, y, board, shipsArr);
      const ship = shipsArr.find((element) => element.name === first[2]);
      if (ship.isSunk()) {
        this.smart = false;
      }
    }
    return send;
  },
  gameOver() {
    return gameBoard.allShipsSunk(ships);
  },
});

module.exports = Computer;
